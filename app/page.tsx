'use client';

import React, { useState } from 'react';
import { useBooks } from './context/BookContext';
import { BookCard } from './components/BookCard';

export default function Home() {
  const { books, categories } = useBooks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showCover, setShowCover] = useState(false);

  const filteredBooks = books
    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || 
                 b.author.toLowerCase().includes(search.toLowerCase()) ||
                 b.publisher.toLowerCase().includes(search.toLowerCase()))
    .filter(b => filter === 'All' || b.categories.includes(filter))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="w-full mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative">
          <input 
            className="w-full p-2 pr-10 border rounded text-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <select onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded text-sm flex-1">
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="text-xs flex items-center gap-1">
            <input type="checkbox" checked={showCover} onChange={(e) => setShowCover(e.target.checked)} /> Cover
          </label>
        </div>
      </div>

      <div className="grid gap-0 w-full">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(b => (
            <BookCard 
              key={b.id} 
              book={b} 
              showCover={showCover} 
              onClick={() => {}}
            />
          ))
        ) : (
          <p className="p-4 text-gray-500 text-sm">No books found.</p>
        )}
      </div>

      </main>
  );
}
