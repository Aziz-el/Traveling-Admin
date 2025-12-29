export default function ApplicationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-5 w-5 rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <div className="h-9 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-9 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  )
}
