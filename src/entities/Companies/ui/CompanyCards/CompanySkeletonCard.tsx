import { Building2, Edit2, Trash2, MapPin, TrendingUp, DollarSign } from 'lucide-react'

export function CompanyCardSkeleton() {
  return (
    <div className="bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-800 animate-pulse">
      <div className="flex justify-between p-6 border-b dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-200 rounded-xl dark:bg-gray-800">
            <Building2 className="w-6 h-6 text-transparent" />
          </div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-20 h-3 bg-gray-200 rounded dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex gap-3">
          <Edit2 className="w-4 h-4 text-transparent" />
          <Trash2 className="w-4 h-4 text-transparent" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, ].map(i => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
              <div className="w-20 h-3 mb-2 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="w-12 h-4 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
