import React from 'react';
import { Star } from 'lucide-react';

export default function RatingSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
      ))}
    </div>
  );
}
