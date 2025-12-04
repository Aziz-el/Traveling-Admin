import { useState } from 'react';
import { Sidebar } from '../../widgets/Sidebar';
import { Dashboard } from '../Dashboard/Dashboard';
import Add_Tour from '../Add_Tour/Add_Tour';


export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: 'Активный' | 'Неактивный' | 'Завершен';
  duration?: number; 
  category?: string;
  company?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      name: 'Тур по Европе',
      description: 'Незабываемое путешествие по европейским столицам',
      price: 150000,
      duration: 10,
      category: 'Европа',
      company: 'EuroTravel',
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 48.8566,
      endLng: 2.3522,
      status: 'Активный',
    },
    {
      id: '2',
      name: 'Азиатское приключение',
      description: 'Откройте для себя красоты Азии',
      price: 200000,
      duration: 14,
      category: 'Азия',
      company: 'AsiaTours',
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 1.3521,
      endLng: 103.8198,
      status: 'Активный',
    },
    {
      id: '3',
      name: 'Путешествие по России',
      description: 'Исследуйте просторы родной страны',
      price: 80000,
      duration: 7,
      category: 'Россия',
      company: 'RusTrips',
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 59.9343,
      endLng: 30.3351,
      status: 'Неактивный',
    },
  ]);


  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard tours={tours} />;
      case "add-tour":
        return <Add_Tour />
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
