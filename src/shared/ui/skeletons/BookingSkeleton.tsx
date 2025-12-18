export default function BookingSkeleton() {
  return (
    <div className="
      flex flex-col gap-4 p-4
      border border-gray-200 bg-gray-50 dark:bg-gray-800
      rounded-xl animate-pulse
      md:flex-row
      overflow-hidden   
    ">
      <div className="
        w-full h-28 bg-gray-300 rounded-lg dark:bg-gray-700
        md:w-24 md:h-24 md:flex-shrink-0
      " />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-3">
          <div className="h-5 bg-gray-300 rounded dark:bg-gray-700 w-2/3 md:w-1/3" />
          <div className="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="w-20 h-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-20 h-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-28 h-5 bg-gray-300 rounded dark:bg-gray-700 hidden sm:block" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <span className="hidden sm:block w-2 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-32 h-4 bg-gray-300 rounded dark:bg-gray-700 hidden md:block" />
        </div>
      </div>
    </div>
  );
}
