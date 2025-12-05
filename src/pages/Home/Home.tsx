import { Sidebar } from '../../widgets/Sidebar';
import { Outlet } from 'react-router-dom';

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

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
