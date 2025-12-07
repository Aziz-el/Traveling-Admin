import { useEffect, useRef, useState, useCallback } from 'react';
import { Tour } from '../../app/App';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  tours: Tour[];
}

const TILE_SIZE = 256;
const MIN_ZOOM = 2;
const MAX_ZOOM = 10;

export function InteractiveMap({ tours }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const [zoom, setZoom] = useState(3);
  const [center, setCenter] = useState({ lat: 20, lng: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCenter, setDragCenter] = useState({ lat: 20, lng: 0 });
  const [hoveredTour, setHoveredTour] = useState<Tour | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [needsRedraw, setNeedsRedraw] = useState(true);
  
  const tilesCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Преобразование координат lat/lng в пиксели на карте
  const latLngToPixel = useCallback((lat: number, lng: number, mapZoom: number, mapWidth: number, mapHeight: number, mapCenter: { lat: number; lng: number }) => {
    const scale = Math.pow(2, mapZoom);
    const worldWidth = TILE_SIZE * scale;
    
    // Меркаторская проекция
    const x = ((lng + 180) / 360) * worldWidth;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (worldWidth / 2) - (worldWidth * mercN / (2 * Math.PI));
    
    // Центрирование относительно центра карты
    const centerX = ((mapCenter.lng + 180) / 360) * worldWidth;
    const centerLatRad = (mapCenter.lat * Math.PI) / 180;
    const centerMercN = Math.log(Math.tan(Math.PI / 4 + centerLatRad / 2));
    const centerY = (worldWidth / 2) - (worldWidth * centerMercN / (2 * Math.PI));
    
    return {
      x: mapWidth / 2 + (x - centerX),
      y: mapHeight / 2 + (y - centerY),
    };
  }, []);

  // Загрузка тайла карты
  const loadTile = (x: number, y: number, z: number): Promise<HTMLImageElement> => {
    const key = `${z}-${x}-${y}`;
    
    if (tilesCache.current.has(key)) {
      return Promise.resolve(tilesCache.current.get(key)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // OpenStreetMap тайлы
      img.src = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
      
      img.onload = () => {
        tilesCache.current.set(key, img);
        resolve(img);
      };
      
      img.onerror = reject;
    });
  };

  // Отрисовка карты
  const drawMap = useCallback(async (currentCenter: { lat: number; lng: number }, animate = false) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Очистка
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, width, height);

    // Рисуем тайлы карты
    const scale = Math.pow(2, zoom);
    const centerTileX = ((currentCenter.lng + 180) / 360) * scale;
    const centerLatRad = (currentCenter.lat * Math.PI) / 180;
    const centerMercN = Math.log(Math.tan(Math.PI / 4 + centerLatRad / 2));
    const centerTileY = ((1 - centerMercN / Math.PI) / 2) * scale;

    const numTilesX = Math.ceil(width / TILE_SIZE) + 2;
    const numTilesY = Math.ceil(height / TILE_SIZE) + 2;

    const startTileX = Math.floor(centerTileX - numTilesX / 2);
    const startTileY = Math.floor(centerTileY - numTilesY / 2);

    // Загружаем и рисуем тайлы
    for (let i = 0; i < numTilesX; i++) {
      for (let j = 0; j < numTilesY; j++) {
        const tileX = startTileX + i;
        const tileY = startTileY + j;
        
        if (tileX >= 0 && tileY >= 0 && tileX < scale && tileY < scale) {
          try {
            const tile = await loadTile(tileX, tileY, Math.floor(zoom));
            const offsetX = width / 2 + (tileX - centerTileX) * TILE_SIZE;
            const offsetY = height / 2 + (tileY - centerTileY) * TILE_SIZE;
            ctx.drawImage(tile, offsetX, offsetY, TILE_SIZE, TILE_SIZE);
          } catch (e) {
            // Тайл не загрузился, рисуем заглушку
            const offsetX = width / 2 + (tileX - centerTileX) * TILE_SIZE;
            const offsetY = height / 2 + (tileY - centerTileY) * TILE_SIZE;
            ctx.fillStyle = '#d1d5db';
            ctx.fillRect(offsetX, offsetY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }

    // Рисуем маршруты туров
    tours.forEach((tour) => {
      const start = latLngToPixel(tour.startLat, tour.startLng, zoom, width, height, currentCenter);
      const end = latLngToPixel(tour.endLat, tour.endLng, zoom, width, height, currentCenter);

      // Рисуем изогнутую линию маршрута
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const curvature = dist * 0.2;
      
      const controlX = midX - (dy / dist) * curvature;
      const controlY = midY + (dx / dist) * curvature;

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
      ctx.strokeStyle = hoveredTour?.id === tour.id ? '#3b82f6' : '#60a5fa';
      ctx.lineWidth = hoveredTour?.id === tour.id ? 3 : 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Стрелка направления
      const arrowSize = 8;
      const angle = Math.atan2(end.y - controlY, end.x - controlX);
      ctx.beginPath();
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(
        end.x - arrowSize * Math.cos(angle - Math.PI / 6),
        end.y - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        end.x - arrowSize * Math.cos(angle + Math.PI / 6),
        end.y - arrowSize * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = hoveredTour?.id === tour.id ? '#3b82f6' : '#60a5fa';
      ctx.fill();

      // Маркер старта (зеленый)
      ctx.beginPath();
      ctx.arc(start.x, start.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Маркер финиша (красный)
      ctx.beginPath();
      ctx.arc(end.x, end.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Анимированный пульс при наведении
      if (hoveredTour?.id === tour.id && animate) {
        const pulse = (Date.now() % 1000) / 1000;
        const radius = 8 + pulse * 10;
        
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - pulse})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(end.x, end.y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(239, 68, 68, ${1 - pulse})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [tours, zoom, hoveredTour, latLngToPixel]);

  // Обработка наведения мыши
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x: e.clientX, y: e.clientY });

    // Проверка наведения на маршрут
    let found = false;
    const currentCenter = isDragging ? dragCenter : center;
    
    for (const tour of tours) {
      const start = latLngToPixel(tour.startLat, tour.startLng, zoom, canvas.width, canvas.height, currentCenter);
      const end = latLngToPixel(tour.endLat, tour.endLng, zoom, canvas.width, canvas.height, currentCenter);

      // Проверка близости к линии маршрута
      const distToLine = pointToLineDistance(x, y, start.x, start.y, end.x, end.y);
      if (distToLine < 10) {
        if (hoveredTour?.id !== tour.id) {
          setHoveredTour(tour);
        }
        found = true;
        break;
      }
    }

    if (!found && hoveredTour) {
      setHoveredTour(null);
    }

    // Обработка драга
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      const scale = Math.pow(2, zoom);
      const worldWidth = TILE_SIZE * scale;
      
      const deltaLng = -(dx / worldWidth) * 360;
      const deltaLat = (dy / worldWidth) * 180;
      
      const newCenter = {
        lat: Math.max(-85, Math.min(85, center.lat + deltaLat)),
        lng: ((center.lng + deltaLng + 180) % 360) - 180,
      };
      
      setDragCenter(newCenter);
      setNeedsRedraw(true);
    }
  };

  const pointToLineDistance = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCenter(center);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setCenter(dragCenter);
      setIsDragging(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(MAX_ZOOM, zoom + 1));
    setNeedsRedraw(true);
  };

  const handleZoomOut = () => {
    setZoom(Math.max(MIN_ZOOM, zoom - 1));
    setNeedsRedraw(true);
  };

  const handleReset = () => {
    setZoom(3);
    setCenter({ lat: 20, lng: 0 });
    setNeedsRedraw(true);
  };

  // Основной эффект для отрисовки
  useEffect(() => {
    if (needsRedraw || isDragging) {
      const currentCenter = isDragging ? dragCenter : center;
      drawMap(currentCenter, false);
      setNeedsRedraw(false);
    }
  }, [needsRedraw, isDragging, dragCenter, center, drawMap]);

  // Эффект для анимации при наведении
  useEffect(() => {
    if (hoveredTour) {
      const animate = () => {
        const currentCenter = isDragging ? dragCenter : center;
        drawMap(currentCenter, true);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [hoveredTour, isDragging, dragCenter, center, drawMap]);

  // Эффект для перерисовки при изменении tours или zoom
  useEffect(() => {
    setNeedsRedraw(true);
  }, [tours, zoom]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-200 dark:bg-gray-800">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-move"
      />

      {/* Контролы карты */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110"
          title="Увеличить"
        >
          <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110"
          title="Уменьшить"
        >
          <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-110"
          title="Сбросить"
        >
          <Maximize2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Точка старта</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Точка финиша</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-gray-700 dark:text-gray-300">Маршрут</span>
          </div>
        </div>
      </div>

      {/* Tooltip при наведении */}
      {hoveredTour && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 pointer-events-none border border-gray-200 dark:border-gray-700 max-w-sm animate-in fade-in duration-200"
          style={{
            left: mousePos.x + 15,
            top: mousePos.y + 15,
          }}
        >
          <h3 className="text-gray-900 dark:text-white mb-1">{hoveredTour.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{hoveredTour.description}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                {hoveredTour.category}
              </span>
              <span className="text-gray-600 dark:text-gray-400">{hoveredTour.company}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Старт: {hoveredTour.startLat.toFixed(4)}, {hoveredTour.startLng.toFixed(4)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Финиш: {hoveredTour.endLat.toFixed(4)}, {hoveredTour.endLng.toFixed(4)}
            </p>
            <p className="text-gray-900 dark:text-white">${hoveredTour.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}
