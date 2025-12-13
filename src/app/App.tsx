import { useEffect, useState } from 'react';
import { Dashboard } from '../pages/Dashboard';
import { AddTour } from '../pages/AddTour';
import { ToursList } from '../pages/ToursList';
import { Companies } from '../pages/Companies';
import { Bookings } from '../pages/Bookings';
import  TourEditingPage from '../pages/TourEditingPage';
import { Users } from '../pages/Users';
import { Routes,Route } from 'react-router';
import { Settings } from '../pages/Settings';
import { RoutesPage } from '../pages/RoutesPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TourDetails from '../pages/TourDetails';
import Reviews from '../pages/Reviews';
import ProtectedLayout from './Layouts/ProtectedLayout';
import { ToastProvider } from '../shared/ui/Toast';
import { useTourStore } from '../entities/Tour/model/useTourStore';
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
  let toursStore = useTourStore();
  let toursData = toursStore.tours;
  useEffect(() => {
    toursStore.fetchTours();
  }, []);
    
  const handleSelectTour = (id: string) => {
    setSelectedTourId(id);
  };

  const handleMapItemClick = (tourId: string, x: number, y: number) => {
    setMiniCard({ tourId, x, y });
    setTimeout(() => setMiniCard(null), 4000);
  };

    return (
      <ToastProvider>
      <Routes>
          <Route path ="/" element={<Login />} />
          <Route path ="register" element={<Register />} />
          <Route path="*" element={
           <ProtectedLayout>
                <Routes>
                  <Route path='dashboard' element={<Dashboard onMapItemClick={handleMapItemClick} onSelectTour={handleSelectTour} />} />
                  <Route path='add-tour' element={<AddTour  />}/>
                  <Route path='tours' element={<ToursList 
  
                      onSelectTour={handleSelectTour}
                      selectedTourId={selectedTourId}
                    />} />
                  <Route path='tours/:id' element={<TourDetails />} />
                  <Route path='edit-tour/:id' element={<TourEditingPage />} />
                  <Route path='companies' element={<Companies />}/>
                  <Route path='bookings' element={<Bookings />}/>
                  <Route path='users' element={<Users />}/>
                  <Route path='routes' element={<RoutesPage />}/>
                  <Route path='reviews' element={<Reviews/>}/>
                  <Route path='settings' element={<Settings />}/>
                </Routes>
            
            </ProtectedLayout>
          } />
        </Routes>
        </ToastProvider>
  );
}
