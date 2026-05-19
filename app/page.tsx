'use client';

import React, { useState } from 'react';
import { useBooks } from './context/BookContext';
import { BookCard } from './components/BookCard';
import { BookDetail } from './components/BookDetail';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  categories: string[];
  addedAt: Date;
};

export default function Home() {
  const { books, categories } = useBooks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showCover, setShowCover] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = books
    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || 
                 b.author.toLowerCase().includes(search.toLowerCase()) ||
                 b.publisher.toLowerCase().includes(search.toLowerCase()))
    .filter(b => filter === 'All' || b.categories.includes(filter))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="w-full mx-auto p-4 pb-20 overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative">
          <input 
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <select onChange={(e) => setFilter(e.target.value)} className="p-2 border border-gray-300 dark:border-gray-700 rounded text-sm flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="text-xs flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={showCover} onChange={(e) => setShowCover(e.target.checked)} /> Cover
          </label>
        </div>
      </div>

      <div className="grid gap-0 w-full overflow-x-hidden">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(b => (
            <BookCard 
              key={b.id} 
              book={b} 
              showCover={showCover} 
              onClick={() => setSelectedBook(b)}
            />
          ))
        ) : (
          <p className="p-4 text-gray-500 dark:text-gray-400 text-sm">No books found.</p>
        )}
      </div>

      {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </main>
  );
}
