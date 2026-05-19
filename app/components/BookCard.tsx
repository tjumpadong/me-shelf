'use client';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  categories: string[];
  addedAt: Date;
};

export const BookCard = ({ book, showCover, onClick }: { book: Book, showCover: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition"
    >
      {showCover && (
        <img
          src={book.coverImage || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 40 60"><rect width="40" height="60" fill="#eee"/></svg>'}
          alt=""
          className="w-10 h-14 object-cover rounded bg-gray-100 dark:bg-gray-700 flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0 w-full overflow-hidden">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight w-full">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
          {book.author}
          {book.categories.length > 0 && ` • ${book.categories.join(', ')}`}
        </p>
      </div>
    </button>
  );
};
