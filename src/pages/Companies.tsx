import React, { useState, useEffect } from 'react';
import { Tour } from '../app/App';
import { useCompaniesStore } from '../shared/hooks/useCompanies';
import { Building2, MapPin, DollarSign, TrendingUp, Edit2, Trash2, Plus } from 'lucide-react';
import CompanyModal from '../shared/ui/CompanyModal';

interface CompaniesProps {
  tours: Tour[];
}

export function Companies({ tours }: CompaniesProps) {
  const companies = useCompaniesStore(state => state.companies);
  const addCompany = useCompaniesStore(state => state.addCompany);
  const renameCompany = useCompaniesStore(state => state.renameCompany);
  const removeCompany = useCompaniesStore(state => state.removeCompany);
  const syncWithTours = useCompaniesStore(state => state.syncWithTours);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    syncWithTours(tours);
  }, [tours]);

  const getCompanyStats = (companyName: string) => {
    const companyTours = tours.filter(t => t.company === companyName);
    const activeTours = companyTours.filter(t => t.status === 'Активный');
    const totalRevenue = companyTours.reduce((sum, t) => sum + t.price, 0);
    const avgPrice = companyTours.length > 0 ? totalRevenue / companyTours.length : 0;

    return {
      total: companyTours.length,
      active: activeTours.length,
      revenue: totalRevenue,
      avgPrice: avgPrice,
      tours: companyTours,
    };
  };

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (name: string) => {
    setEditing(name);
    setModalOpen(true);
  };

  const handleDelete = (name: string) => {
    if (!confirm(`Удалить компанию "${name}"? Это не удалит туры, но отвяжет статистику.`)) return;
    removeCompany(name);
  };

  const handleSave = (name: string) => {
    if (editing) {
      renameCompany(editing, name);
    } else {
      addCompany(name);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Компании</h1>
          <p className="text-gray-600 dark:text-gray-400">Туроператоры и их статистика</p>
        </div>
        <div>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Добавить компанию
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {companies.map((company) => {
          const stats = getCompanyStats(company);
          
          return (
            <div key={company} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                    <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 dark:text-white">{company}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Туроператор</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(company)} className="px-2 py-1 rounded-md text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(company)} className="px-2 py-1 rounded-md text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">Всего туров</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">{stats.total}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-gray-600 dark:text-gray-400">Активных</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">{stats.active}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">Выручка</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">${stats.revenue.toLocaleString()}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-600 dark:text-gray-400">Средняя цена</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">${Math.round(stats.avgPrice)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <h3 className="text-gray-900 dark:text-white mb-3">Туры компании</h3>
                  <div className="space-y-2">
                    {stats.tours.map((tour) => (
                      <div 
                        key={tour.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 dark:text-white truncate">{tour.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                              {tour.category}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                              tour.status === 'Активный'
                                ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                              {tour.status}
                            </span>
                          </div>
                        </div>
                        <span className="text-gray-900 dark:text-white ml-4">${tour.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CompanyModal open={modalOpen} initialName={editing ?? ''} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </div>
  );
}
