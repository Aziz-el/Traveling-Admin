  import { useSearchParams } from 'react-router';

type Props = {
  page: number;
  count: number;
  onChange: (page: number) => void;
};

export default function PaginationCustom({ page, count, onChange }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (newPage: number) => {
    if (newPage < 1 || newPage > count) return;
    onChange(newPage);
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= count; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      <button
        onClick={() => handleClick(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-md border transition disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Prev
      </button>

      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => handleClick(p)}
          className={`px-3 py-1 rounded-md border transition ${
            p === page
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500'
              : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
          } hover:bg-gray-200 dark:hover:bg-gray-700`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => handleClick(page + 1)}
        disabled={page === count}
        className="px-3 py-1 rounded-md border transition disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Next
      </button>
    </div>
  );
}
