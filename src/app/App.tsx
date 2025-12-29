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
import Register from '../pages/register';
import TourDetails from '../pages/TourDetails';
import ProtectedLayout from './Layouts/ProtectedLayout';
import { ToastProvider } from '../shared/ui/Toast';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import Reviews from '../pages/Reviews';
import BookingDetails from '../pages/BookingDetails';
import NotFound from '../pages/NotFound';
import CompanyTours from '../pages/CompanyTours';
import Applications from '../pages/Applications';
import UserDetails from '../pages/UserDetails';
import MyCompany from '../pages/MyCompany';
import CompanyLayout from './Layouts/CompanyLayout';
import AdminLayout from './Layouts/AdminLayout';
export default function App() {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [miniCard, setMiniCard] = useState<{ tourId: string; x: number; y: number } | null>(null);

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
          <Route path ="Login" element={<Login />} />
          <Route path ="register" element={<Register />} />
          <Route path="*" element={
           <ProtectedLayout>
                <Routes>
                  <Route path='/' element={<Dashboard onMapItemClick={handleMapItemClick} onSelectTour={handleSelectTour} selectedTourId={selectedTourId} />} />
                  <Route path='tours' element={<ToursList 
  
                      onSelectTour={handleSelectTour}
                      selectedTourId={selectedTourId}
                    />} />
                  <Route path='companies' element={<Companies />}/>
                  <Route path="companies/:id/tours" element={<CompanyTours />}/>
                  <Route path='bookings' element={<Bookings />}/>
                  <Route path='bookings/:id' element={<BookingDetails />} />
                  <Route path='tours/:id' element={<TourDetails />} />
                  <Route path='reviews' element={<Reviews/>}/>
                   <Route path="applications" element={<Applications />} />
                  <Route path ="*" element={
                    <CompanyLayout>
                      <Routes>
                      <Route path='add-tour' element={<AddTour  />}/>
                      <Route path='edit-tour/:id' element={<TourEditingPage />} />
                      <Route path='my-company' element={<MyCompany/>}/>
                      
                      </Routes>
                    </CompanyLayout>

                  } />
                   <Route path ="*" element={
                    <AdminLayout>
                      <Routes>
                        <Route path='users' element={<Users />}/>
                        <Route path='users/:id' element={<UserDetails />} />
                       
                      </Routes>
                    </AdminLayout>

                  } />
                  <Route path='*' element={<NotFound />} />
    
                  
                  
                  
                  
                  {/* <Route path='routes' element={<RoutesPage />}/> */}
                  {/* <Route path='settings' element={<Settings />}/> */}
                  
                  
                </Routes>
            
            </ProtectedLayout>
          } />
        </Routes>
        </ToastProvider>
  );
}
