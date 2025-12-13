import { useEffect, useState } from 'react';
import { Dashboard } from '../pages/Dashboard';
import { AddTour } from '../pages/AddTour';
import { ToursList } from '../pages/ToursList';
import { Companies } from '../pages/Companies';
import { Bookings } from '../pages/Bookings';
import  TourEditingPage from '../pages/TourEditingPage';
import { Users } from '../pages/Users';
import { Routes,Route } from 'react-router';
// import { Settings } from '../pages/Settings';
// import { RoutesPage } from '../pages/RoutesPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TourDetails from '../pages/TourDetails';
import ProtectedLayout from './Layouts/ProtectedLayout';
import { ToastProvider } from '../shared/ui/Toast';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import Reviews from '../pages/Reviews';
import NotFound from '../pages/NotFound';
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
                  <Route path='dashboard' element={<Dashboard onMapItemClick={handleMapItemClick} onSelectTour={handleSelectTour} selectedTourId={selectedTourId} />} />
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
                  {/* <Route path='routes' element={<RoutesPage />}/> */}
                  <Route path='reviews' element={<Reviews/>}/>
                  <Route path='settings' element={<Settings />}/>
                  <Route path='*' element={<NotFound />} />
                </Routes>
            
            </ProtectedLayout>
          } />
        </Routes>
        </ToastProvider>
  );
}
