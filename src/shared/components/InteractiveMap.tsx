import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '../../shared/ui/button';
import { useTourStore } from '../../entities/Tour/model/useTourStore';

interface Tour {
  id: string;
  title?: string;
  description?: string;
  startLat?: number;
  startLng?: number;
  endLat?: number;
  endLng?: number;
  lat?: number;
  lng?: number;
}

interface InteractiveMapProps {
  tours?: Tour[];
  selectedRoute?: { startLat: number; startLng: number; endLat: number; endLng: number };
  onMapItemClick?: (tourId: string, x: number, y: number) => void;
  onSelectTour?: (tourIdOrTitle: string) => void; // accepts id or title
  selectedTour?: string | null; // id or title
}

export function InteractiveMap({ tours: propTours, selectedRoute, onMapItemClick, onSelectTour, selectedTour }: InteractiveMapProps) {
  const storeTours = useTourStore().tours as Tour[];
  const tours = propTours ?? storeTours;
  const [hoveredTour, setHoveredTour] = useState<string | null>(null);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState({ lat: 40, lng: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tiles, setTiles] = useState<{ x: number; y: number; z: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const latLngToPixel = (lat: number, lng: number, zoom: number) => {
    const scale = 256 * Math.pow(2, zoom);
    const x = (lng + 180) / 360 * scale;
    const y = (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * scale;
    return { x, y };
  };

  const pixelToLatLng = (x: number, y: number, zoom: number) => {
    const scale = 256 * Math.pow(2, zoom);
    const lng = x / scale * 360 - 180;
    const n = Math.PI - 2 * Math.PI * y / scale;
    const lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    return { lat, lng };
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const centerPixel = latLngToPixel(center.lat, center.lng, zoom);
    
    const numTilesX = Math.ceil(width / 256) + 2;
    const numTilesY = Math.ceil(height / 256) + 2;
    
    const startTileX = Math.floor(centerPixel.x / 256) - Math.floor(numTilesX / 2);
    const startTileY = Math.floor(centerPixel.y / 256) - Math.floor(numTilesY / 2);
    
    const newTiles = [];
    for (let i = 0; i < numTilesX; i++) {
      for (let j = 0; j < numTilesY; j++) {
        const tileX = startTileX + i;
        const tileY = startTileY + j;
        const maxTile = Math.pow(2, zoom);
        
        if (tileX >= 0 && tileX < maxTile && tileY >= 0 && tileY < maxTile) {
          newTiles.push({ x: tileX, y: tileY, z: zoom });
        }
      }
    }
    
    setTiles(newTiles);
  }, [center, zoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const centerPixel = latLngToPixel(center.lat, center.lng, zoom);
    
    const newCenterPixel = {
      x: centerPixel.x - dx,
      y: centerPixel.y - dy,
    };
    
    const newCenter = pixelToLatLng(newCenterPixel.x, newCenterPixel.y, zoom);
    setCenter(newCenter);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 10));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 1));
  };

  const handleReset = () => {
    setZoom(2);
    setCenter({ lat: 40, lng: 20 });
  };

  // Search state
  const [query, setQuery] = useState('');
  const suggestions = query.trim() === '' ? [] : tours.filter(t => (t.title || '').toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8);

  const getTourCoords = (tour: any) => {
    // Accept various naming conventions from API: camelCase and snake_case
    const read = (obj: any, keys: string[]) => {
      for (const k of keys) {
        if (obj[k] !== undefined && obj[k] !== null) return Number(obj[k]);
      }
      return NaN;
    };
    const startLat = read(tour, ['startLat', 'start_lat', 'lat', 'latitude']);
    const startLng = read(tour, ['startLng', 'start_lng', 'lng', 'longitude']);
    const endLat = read(tour, ['endLat', 'end_lat', 'lat', 'latitude']);
    const endLng = read(tour, ['endLng', 'end_lng', 'lng', 'longitude']);
    const hasStart = !isNaN(startLat) && !isNaN(startLng);
    const hasEnd = !isNaN(endLat) && !isNaN(endLng);
    return {
      startLat: hasStart ? startLat : null,
      startLng: hasStart ? startLng : null,
      endLat: hasEnd ? endLat : null,
      endLng: hasEnd ? endLng : null,
      singleLat: !hasStart && !hasEnd && !isNaN(startLat) ? startLat : null,
      singleLng: !hasStart && !hasEnd && !isNaN(startLng) ? startLng : null,
    };
  };

  const handleSelectByTitle = (t: Tour) => {
    const coords = getTourCoords(t);
    // center to start if available, otherwise to end
    const lat = coords.startLat ?? coords.endLat;
    const lng = coords.startLng ?? coords.endLng;
    if (lat != null && lng != null) setCenter({ lat, lng });
    setQuery('');
    onSelectTour && onSelectTour(t.id ?? (t.title ?? ''));
  };

  useEffect(() => {
    if (!selectedTour) return;
    const t = tours.find(t => t.id === selectedTour || (t.title && t.title === selectedTour));
    if (!t) return;
    const coords = getTourCoords(t);
    const lat = coords.startLat ?? coords.endLat;
    const lng = coords.startLng ?? coords.endLng;
    if (lat != null && lng != null) setCenter({ lat, lng });
  }, [selectedTour, tours]);

  // Конвертация координат маршрутов в позиции на экране
  const getScreenPosition = (lat: number, lng: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const centerPixel = latLngToPixel(center.lat, center.lng, zoom);
    const pointPixel = latLngToPixel(lat, lng, zoom);
    
    return {
      x: width / 2 + (pointPixel.x - centerPixel.x),
      y: height / 2 + (pointPixel.y - centerPixel.y),
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-slate-200 overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Тайлы карты OpenStreetMap */}
      <div className="absolute inset-0">
        {tiles.map((tile) => {
          const centerPixel = latLngToPixel(center.lat, center.lng, zoom);
          const tilePixel = { x: tile.x * 256, y: tile.y * 256 };
          const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
          const containerHeight = containerRef.current?.getBoundingClientRect().height || 0;
          
          const left = containerWidth / 2 + (tilePixel.x - centerPixel.x);
          const top = containerHeight / 2 + (tilePixel.y - centerPixel.y);
          
          return (
            <img
              key={`${tile.z}-${tile.x}-${tile.y}`}
              src={`https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`}
              alt=""
              className="absolute pointer-events-none"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: '256px',
                height: '256px',
              }}
            />
          );
        })}
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {tours.map((tour) => {
          const isHovered = hoveredTour === String(tour.id);
          const c = getTourCoords(tour as any);
          const startLat = c.startLat;
          const startLng = c.startLng;
          const endLat = c.endLat;
          const endLng = c.endLng;
          const singleLat = c.singleLat;
          const singleLng = c.singleLng;
          if (startLat == null || startLng == null || endLat == null || endLng == null) {
            // No route; draw single point if available
            if (singleLat != null && singleLng != null) {
              const pos = getScreenPosition(singleLat, singleLng);
              return (
                <g key={tour.id} className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); onMapItemClick?.(tour.id, pos.x, pos.y); onSelectTour?.(String(tour.id)); }} onMouseEnter={() => setHoveredTour(tour.id)} onMouseLeave={() => setHoveredTour(null)}>
                  <circle cx={pos.x} cy={pos.y} r={isHovered ? 12 : 8} fill="#3b82f6" stroke="white" strokeWidth="3" />
                </g>
              );
            }
            return null;
          }
          const start = getScreenPosition(startLat, startLng);
          const end = getScreenPosition(endLat, endLng);
          
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          const controlOffset = Math.min(distance * 0.15, 80);

          return (
            <g key={tour.id}>
              {/* Подсветка */}
              {isHovered && (
                <path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY - controlOffset} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  opacity="0.2"
                />
              )}

              {/* Основная линия */}
              <path
                d={`M ${start.x} ${start.y} Q ${midX} ${midY - controlOffset} ${end.x} ${end.y}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={isHovered ? 4 : 3}
                strokeDasharray="8,4"
                opacity={isHovered ? 1 : 0.8}
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredTour(String(tour.id))}
                onMouseLeave={() => setHoveredTour(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onMapItemClick?.(tour.id, midX, midY - controlOffset);
                  onSelectTour?.(String(tour.id));
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Стрелка направления */}
              <defs>
                <marker
                  id={`arrow-${tour.id}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                </marker>
              </defs>
              
              <path
                d={`M ${midX} ${midY - controlOffset} L ${end.x} ${end.y}`}
                fill="none"
                stroke="transparent"
                strokeWidth="3"
                markerEnd={`url(#arrow-${tour.id})`}
              />

              {/* Точка старта */}
              <g
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredTour(tour.id)}
                onMouseLeave={() => setHoveredTour(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onMapItemClick?.(tour.id, start.x, start.y);
                  onSelectTour?.(tour.id);
                }}
              >
                <circle
                  cx={start.x}
                  cy={start.y}
                  r={isHovered ? 12 : 9}
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="3"
                />
                {isHovered && (
                  <circle
                    cx={start.x}
                    cy={start.y}
                    r="18"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate attributeName="r" from="18" to="24" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>

              {/* Точка финиша */}
              <g
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredTour(tour.id)}
                onMouseLeave={() => setHoveredTour(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onMapItemClick?.(tour.id, end.x, end.y);
                  onSelectTour?.(tour.id);
                }}
              >
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={isHovered ? 12 : 9}
                  fill="#ef4444"
                  stroke="white"
                  strokeWidth="3"
                />
                {isHovered && (
                  <circle
                    cx={end.x}
                    cy={end.y}
                    r="18"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate attributeName="r" from="18" to="24" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            </g>
          );
        })}

        {selectedRoute && (() => {
          const start = getScreenPosition(selectedRoute.startLat, selectedRoute.startLng);
          const end = getScreenPosition(selectedRoute.endLat, selectedRoute.endLng);
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          const controlOffset = Math.min(distance * 0.15, 80);

          return (
            <g>
              <path
                d={`M ${start.x} ${start.y} Q ${midX} ${midY - controlOffset} ${end.x} ${end.y}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeDasharray="10,5"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="15" dur="0.8s" repeatCount="indefinite" />
              </path>
              <circle cx={start.x} cy={start.y} r="10" fill="#8b5cf6" stroke="white" strokeWidth="3">
                <animate attributeName="r" values="10;13;10" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={end.x} cy={end.y} r="10" fill="#8b5cf6" stroke="white" strokeWidth="3">
                <animate attributeName="r" values="10;13;10" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })()}
      </svg>

      {/* Контролы */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
        <Button size="sm" variant="outline" className="bg-white shadow-lg" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white shadow-lg" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white shadow-lg" onClick={handleReset}>
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Поиск по названию */}
      <div className="absolute top-4 left-4 pointer-events-auto w-60">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти тур по названию"
          className="w-full px-3 py-2 text-sm border rounded bg-white"
        />
        {suggestions.length > 0 && (
          <div className="mt-1 max-h-44 overflow-auto bg-white rounded shadow-lg border">
            {suggestions.map((s) => (
              <div key={s.id} className="px-3 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectByTitle(s)}>
                {s.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-slate-200 p-3 shadow-lg pointer-events-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
            <span className="text-slate-700">Точка старта</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
            <span className="text-slate-700">Точка финиша</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="12">
              <line x1="0" y1="6" x2="24" y2="6" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,4" />
            </svg>
            <span className="text-slate-700">Маршрут</span>
          </div>
          {selectedRoute && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-white shadow-sm"></div>
              <span className="text-slate-700">Предпросмотр</span>
            </div>
          )}
        </div>
      </div>

      {/* Информация о туре */}
      {hoveredTour && tours.find((t) => t.id === hoveredTour) && (
        <div className="absolute top-4 left-4 bg-white rounded-lg border border-slate-200 p-4 shadow-xl max-w-sm pointer-events-auto">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
              <Navigation className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-slate-900 mb-1">
                {tours.find((t) => t.id === hoveredTour)?.title}
              </div>
              <div className="text-slate-600 mb-3">
            {tours.find((t) => t.id === hoveredTour)?.description}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>
                    Старт: {(() => {
                      const t = tours.find((tt) => tt.id === hoveredTour);
                      const c = t ? getTourCoords(t) : null;
                      return c && c.startLat != null ? `${c.startLat.toFixed(4)}°, ${c.startLng?.toFixed(4)}°` : '—';
                    })()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>
                    Финиш: {(() => {
                      const t = tours.find((tt) => tt.id === hoveredTour);
                      const c = t ? getTourCoords(t) : null;
                      return c && c.endLat != null ? `${c.endLat.toFixed(4)}°, ${c.endLng?.toFixed(4)}°` : '—';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Подсказка */}
      <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg border border-slate-200 px-3 py-2 text-slate-600 shadow-sm pointer-events-auto">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Перетаскивайте карту • Zoom: {zoom}</span>
        </div>
      </div>

      {/* Атрибуция OpenStreetMap */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 bg-white/80 px-2 py-0.5 rounded pointer-events-auto">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors
      </div>
    </div>
  );
}
