
interface Props {
  variant?: 1 | 2;
}

export default function UserDetailsSkeleton({ variant = 1 }: Props) {
  if (variant === 2) {
    return (
      <div className="p-4 sm:p-6 min-h-[697px] max-w-3xl mx-auto">
        <div className="bg-white mt-6 dark:bg-[#071024] rounded-2xl p-4 sm:p-6 shadow-md animate-pulse">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
            <div className="flex-1 w-full">
              <div className="h-6 w-3/4 sm:w-2/3 bg-gray-300 rounded mb-2 dark:bg-gray-700" />
              <div className="h-4 w-1/2 sm:w-1/3 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="h-6 w-28 sm:w-20 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="h-6 w-32 sm:w-28 bg-gray-300 rounded dark:bg-gray-700" />
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col gap-2 mt-3 md:mt-0">
              <div className="h-8 w-28 md:w-24 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="h-8 w-28 md:w-24 bg-gray-300 rounded dark:bg-gray-700" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
                <div className="h-4 w-24 bg-gray-300 rounded mb-2 dark:bg-gray-700" />
                <div className="h-5 bg-gray-300 rounded dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // variant 1 (default)
  return (
    <div className="p-4 sm:p-6 min-h-[60vh] max-w-3xl mx-auto">
      <div className="bg-white mt-6 dark:bg-[#071024] rounded-2xl p-4 sm:p-6 shadow-md animate-pulse">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0" />
          <div className="flex-1 w-full">
            <div className="h-6 w-1/2 sm:w-1/3 bg-gray-300 rounded mb-2 dark:bg-gray-700" />
            <div className="h-4 w-1/3 sm:w-1/4 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="h-5 w-24 sm:w-20 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="h-5 w-28 sm:w-24 bg-gray-300 rounded dark:bg-gray-700" />
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col gap-2 mt-3 md:mt-0">
            <div className="h-8 w-28 md:w-24 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-8 w-28 md:w-24 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
              <div className="text-xs text-gray-400 mb-2"><div className="h-3 w-24 bg-gray-300 rounded dark:bg-gray-700" /></div>
              <div className="font-medium text-gray-900 dark:text-white"><div className="h-4 bg-gray-300 rounded dark:bg-gray-700" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
