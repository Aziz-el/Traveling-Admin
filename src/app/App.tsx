import { useState } from 'react';
import { Sidebar } from '../widgets/Sidebar';
import { Dashboard } from '../pages/Dashboard';
import { AddTour } from '../pages/AddTour';
import { ToursList } from '../pages/ToursList';
import { Companies } from '../pages/Companies';
import { Bookings } from '../pages/Bookings';
import { Users } from '../pages/Users';
import { Routes,Route } from 'react-router';
import { Settings } from '../pages/Settings';
import { RoutesPage } from '../pages/RoutesPage';
import Login from '../pages/Login/Login';
import Register from '../pages/register/register';
import TourDetails from '../pages/TourDetails';
export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Азия' | 'Европа' | 'Америка' | 'Африка' | 'Океания' | 'Антарктида';
  startTime: string;
  endTime: string;
  company: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: 'Активный' | 'Неактивный';
  image: string;
}

const categoryImages: Record<string, string> = {
  'Азия': 'https://images.unsplash.com/photo-1603486038792-2d67824265e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhJTIwdHJhdmVsJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2NDY2ODA1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'Европа': 'https://images.unsplash.com/photo-1602828958507-e1b7b2f79b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjB0cmF2ZWwlMjBjaXRpZXN8ZW58MXx8fHwxNzY0NjY4MDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Америка': 'https://images.unsplash.com/photo-1568358916887-e216a96dc86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhJTIwdHJhdmVsJTIwbmF0dXJlfGVufDF8fHx8MTc2NDY2ODA1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'Африка': 'https://images.unsplash.com/photo-1728466852402-f233aed0d299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2ElMjBzYWZhcmklMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjQ2MTc1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'Океания': 'https://images.unsplash.com/photo-1656176914991-a54cfef994ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbmlhJTIwYXVzdHJhbGlhJTIwYmVhY2h8ZW58MXx8fHwxNzY0NTk5MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Антарктида': 'https://images.unsplash.com/photo-1551005916-2cdeb025959f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRhcmN0aWNhJTIwaWNlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2NDY2ODA1NXww&ixlib=rb-4.1.0&q=80&w=1080',
};

export default function App() {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [miniCard, setMiniCard] = useState<{ tourId: string; x: number; y: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      name: 'Токио - Киото: Императорская Япония',
      description: 'Погрузитесь в культуру древних храмов, императорских дворцов и современных небоскребов',
      price: 1500,
      category: 'Азия',
      company: 'GitLens Travel',
      startTime: '2025-06-01 09:00',
      endTime: '2025-06-10 18:00',
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 35.0116,
      endLng: 135.7681,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1594311879147-c172ced24621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwdGVtcGxlfGVufDF8fHx8MTc2NDYxOTk0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Магия Парижа: Эйфелева башня и Лувр',
      description: 'Романтическое путешествие по столице моды, искусства и изысканной кухни',
      price: 2200,
      category: 'Европа',
      company: 'Aviasales Tours',
      startTime: '2025-05-10 09:00',
      endTime: '2025-05-17 20:00',
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: 51.5074,
      endLng: -0.1278,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NDY1NzAzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Нью-Йорк: Город мечты',
      description: 'От небоскребов Манхэттена до культовых достопримечательностей Большого яблока',
      price: 3000,
      category: 'Америка',
      company: 'GitLens Travel',
      startTime: '2025-07-01 08:00',
      endTime: '2025-07-08 22:00',
      startLat: 40.7128,
      startLng: -74.0060,
      endLat: 34.0522,
      endLng: -118.2437,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzY0NTg5NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Африканское сафари: В поисках Большой пятерки',
      description: 'Незабываемая встреча с дикой природой Африки в её естественной среде обитания',
      price: 2800,
      category: 'Африка',
      company: 'Aviasales Tours',
      startTime: '2025-08-12 06:00',
      endTime: '2025-08-20 19:00',
      startLat: -2.1540,
      startLng: 34.6857,
      endLat: -3.0674,
      endLng: 37.3556,
      status: 'Неактивный',
      image: 'https://images.unsplash.com/photo-1535759802691-bf5a6cfe6ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBlbGVwaGFudCUyMHdpbGRsaWZlfGVufDF8fHx8MTc2NDY2OTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '5',
      name: 'Большой Барьерный риф: Подводный рай',
      description: 'Исследуйте крупнейший коралловый риф планеты с кристально чистыми водами',
      price: 3500,
      category: 'Океания',
      company: 'GitLens Travel',
      startTime: '2025-09-05 07:00',
      endTime: '2025-09-12 17:00',
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: -16.5000,
      endLng: 145.7000,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1650190460926-e42b4b64da80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVhdCUyMGJhcnJpZXIlMjByZWVmJTIwYXVzdHJhbGlhfGVufDF8fHx8MTc2NDY2OTE4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '6',
      name: 'Бали: Остров богов',
      description: 'Тропический рай с древними храмами, рисовыми террасами и духовными практиками',
      price: 1800,
      category: 'Азия',
      company: 'Aviasales Tours',
      startTime: '2025-10-01 09:00',
      endTime: '2025-10-07 18:00',
      startLat: -8.3405,
      startLng: 115.0920,
      endLat: -8.5069,
      endLng: 115.2625,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1581032841303-0ba9e894ebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwdGVtcGxlfGVufDF8fHx8MTc2NDY1ODAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '7',
      name: 'Санторини: Белоснежная жемчужина',
      description: 'Романтические закаты, белые дома с голубыми куполами и незабываемые виды Эгейского моря',
      price: 2500,
      category: 'Европа',
      company: 'GitLens Travel',
      startTime: '2025-06-15 10:00',
      endTime: '2025-06-22 19:00',
      startLat: 36.3932,
      startLng: 25.4615,
      endLat: 37.9838,
      endLng: 23.7275,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzY0NjUwMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '8',
      name: 'Гранд-Каньон: Чудо природы',
      description: 'Величественные каньоны, созданные миллионами лет эрозии, захватывающие виды',
      price: 2100,
      category: 'Америка',
      company: 'Aviasales Tours',
      startTime: '2025-04-20 07:00',
      endTime: '2025-04-25 17:00',
      startLat: 36.1069,
      startLng: -112.1129,
      endLat: 36.0544,
      endLng: -111.9223,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1706387631343-79e1a2ec3fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZCUyMGNhbnlvbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjQ1ODkzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '9',
      name: 'Дубай: Город будущего',
      description: 'Футуристические небоскребы, роскошные отели и невероятные торговые центры',
      price: 3200,
      category: 'Азия',
      company: 'GitLens Travel',
      startTime: '2025-11-05 10:00',
      endTime: '2025-11-12 21:00',
      startLat: 25.2048,
      startLng: 55.2708,
      endLat: 25.0762,
      endLng: 55.1387,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1726533765275-a69cfd7f9897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBtb2Rlcm58ZW58MXx8fHwxNzY0NTY0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '10',
      name: 'Мальдивы: Райские острова',
      description: 'Бирюзовые лагуны, белоснежные пляжи и роскошные бунгало над водой',
      price: 4500,
      category: 'Азия',
      company: 'Aviasales Tours',
      startTime: '2025-12-01 08:00',
      endTime: '2025-12-10 20:00',
      startLat: 4.1755,
      startLng: 73.5093,
      endLat: 3.2028,
      endLng: 72.9364,
      status: 'Активный',
      image: 'https://images.unsplash.com/photo-1637576306143-0262e56c5231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY0NjY5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  };

  const addTour = (tour: Tour) => {
    setTours([...tours, tour]);
  };

  const handleSelectTour = (id: string) => {
    setSelectedTourId(id);
  };

  const handleMapItemClick = (tourId: string, x: number, y: number) => {
    setMiniCard({ tourId, x, y });
    setTimeout(() => setMiniCard(null), 4000);
  };

  const updateTour = (id: string, updatedTour: Tour) => {
    setTours(tours.map(tour => tour.id === id ? updatedTour : tour));
  };

  const deleteTour = (id: string) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  // function ProtectedLayout({ children }: { children: any }) {
  //   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  //   if (!token) {
  //     if (typeof window !== 'undefined') window.location.href = '/login';
  //     return null;
  //   }
  //   return <>{children}</>;
  // }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
        <Routes>
          <Route path ="login" element={<Login />} />
          <Route path ="register" element={<Register />} />
          <Route path="*" element={
            // <ProtectedLayout>
              <div className="flex h-full bg-gray-50 dark:bg-gray-950">
                <Sidebar 
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
                <div className="flex-1 ml-64">
                <Routes>
                  <Route path='/' element={<Dashboard tours={tours} onMapItemClick={handleMapItemClick} onSelectTour={handleSelectTour} />} />
                  <Route path='dashboard' element={<Dashboard tours={tours} onMapItemClick={handleMapItemClick} onSelectTour={handleSelectTour} />} />
                  <Route path='add-tour' element={<AddTour onAddTour={addTour} categoryImages={categoryImages} />}/>
                  <Route path='tours' element={<ToursList 
                      tours={tours} 
                      onUpdateTour={updateTour} 
                      onDeleteTour={deleteTour}
                      categoryImages={categoryImages}
                      onSelectTour={handleSelectTour}
                      selectedTourId={selectedTourId}
                    />} />
                  <Route path='tours/:id' element={<TourDetails tours={tours} />} />
                  <Route path='companies' element={<Companies tours={tours} />}/>
                  <Route path='bookings' element={<Bookings tours={tours} />}/>
                  <Route path='users' element={<Users />}/>
                  <Route path='routes' element={<RoutesPage />}/>
                  <Route path='settings' element={<Settings />}/>
                </Routes>
              </div>
              </div>
            // </ProtectedLayout>
          } />
        </Routes>
    </div>
  );
}
