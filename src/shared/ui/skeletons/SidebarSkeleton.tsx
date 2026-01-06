
export default function SidebarSkeleton() {
  return (
    <aside className="sticky top-0 left-0 flex-col hidden w-64 h-screen overflow-y-auto bg-white border-r border-gray-200 lg:flex dark:bg-gray-900 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-36 h-6 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse" />
      </div>

      <nav className="flex-1 p-4 space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg">
            <div className="w-5 h-5 bg-gray-200 rounded dark:bg-gray-700 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 dark:bg-gray-700 animate-pulse" />
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded dark:bg-gray-700 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-24 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>
    </aside>
  )
}
