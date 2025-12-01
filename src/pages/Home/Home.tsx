import { useState } from 'react';
import { Sidebar } from '../../widgets/Sidebar';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  return (
    <div>
      <Sidebar currentPage={currentPage} onNavigate={(page: string) => setCurrentPage(page)} />
    </div>
  )
}
