import { useState } from 'react';
import { type Tour } from '../Home/Home';
import { Button } from '../../shared/UI/Button/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/UI/CustomSelect/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../shared/UI/Table/table';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../shared/UI/Badge/Badge';
import { Edit2, Trash2, Filter, Calendar } from 'lucide-react';
import type { Booking } from '../../app/App';

interface ToursListProps {
  tours: Tour[];
  onDelete: (id: string) => void;
  onUpdate: (tour: Tour) => void;
  onBook: (booking: Booking) => void;
}

    

export function ToursList({ tours, onDelete, onUpdate, onBook }: ToursListProps) {
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  
  

  const uniqueCompanies = Array.from(new Set(tours.map(tour => tour.company)));

  const filteredTours = tours.filter(tour => {
    const categoryMatch = filterCategory === 'all' || tour.category === filterCategory;
    const companyMatch = filterCompany === 'all' || tour.company === filterCompany;
    return categoryMatch && companyMatch;
  });

  const handleEdit = (tour: Tour) => {
    setEditingTour({ ...tour });
    setIsDialogOpen(true);
  };

  const handleBookTour = (tour: Tour) => {
    navigate(`/reservation/${tour.id}`);
  };



  const getStatusColor = (status: Tour['status']) => {
    switch (status) {
      case 'Активный':
        return 'bg-green-50  text-green-700  border-green-200 ';
      case 'Неактивный':
        return 'bg-slate-50  text-slate-700  border-slate-200 ';
      case 'Завершен':
        return 'bg-blue-50  text-blue-700  border-blue-200 ';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white  border-b border-slate-200  px-8 py-6">
        <h2 className="text-slate-900 ">Список туров</h2>
        <p className="text-slate-600  mt-1">Управление всеми туристическими маршрутами</p>
      </header>

      <div className="flex-1 p-8 overflow-auto bg-slate-50 flex flex-col gap-6">
        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-600 " />
            <span className="text-slate-800 ">Фильтры:</span>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="Европа">Европа</SelectItem>
              <SelectItem value="Азия">Азия</SelectItem>
              <SelectItem value="Африка">Африка</SelectItem>
              <SelectItem value="Америка">Америка</SelectItem>
              <SelectItem value="Океания">Океания</SelectItem>
              <SelectItem value="Россия">Россия</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCompany} onValueChange={setFilterCompany}>
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="Компания" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="all">Все компании</SelectItem>
              {uniqueCompanies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-slate-600  ml-auto flex items-center">
            Всего туров: <span className="ml-2 text-slate-900 ">{filteredTours.length}</span>
          </div>
        </div>

        <div className="bg-white  rounded-xl border border-slate-200  overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тур</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Компания</TableHead>
                <TableHead>Длительность</TableHead>
                <TableHead>Старт (Lat, Lng)</TableHead>
                <TableHead>Финиш (Lat, Lng)</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>
                    <img src={tour.image} alt={tour.name} />
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-slate-900 ">{tour.name}</div>
                        <div className="text-slate-600  mt-1">{tour.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700  border-blue-200 ">
                      {tour.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-700 ">{tour.company}</TableCell>
                  <TableCell className="text-slate-700 ">
                    {tour.duration} {tour.duration === 1 ? 'день' : tour.duration < 5 ? 'дня' : 'дней'}
                  </TableCell>
                  <TableCell className="text-slate-600 ">
                    {tour.startLat.toFixed(4)}, {tour.startLng.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {tour.endLat.toFixed(4)}, {tour.endLng.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-white">
                    {tour.price.toLocaleString()} ₽
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(tour.status)}>
                      {tour.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {tour.status === 'Активный' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookTour(tour)}
                          title="Забронировать"
                        >
                          <Calendar className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tour)}
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(tour.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}