import React from 'react';
import { Loader2 } from 'lucide-react';

const PrettyLoader = ({ loadMoreRef, isLoading, currentPage, pagination }:any) => {
  return (
    <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-8 text-teal-600">
      {isLoading ? (
        <div className="flex items-center gap-3 bg-teal-50 px-6 py-3 rounded-full shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
          <span className="text-sm font-medium text-teal-700">Loading more properties...</span>
        </div>
      ) : (
        currentPage < (pagination?.totalPages || 0) && (
          <div className="flex flex-col items-center gap-2 bg-teal-50 px-6 py-3 rounded-full shadow-sm">
            <span className="text-sm font-medium text-teal-700">Scroll down to load more</span>
            <div className="animate-bounce text-teal-500">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PrettyLoader;