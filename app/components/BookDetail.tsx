'use client';

import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  categories: string[];
  addedAt: Date;
};

export const BookDetail = ({ book, onClose }: { book: Book, onClose: () => void }) => {
  const { updateBook, deleteBook, categories: allCategories } = useBooks();
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [categories, setCategories] = useState(book.categories);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = () => {
    updateBook({ ...book, title, author, publisher, categories });
    onClose();
  };

  const removeCategory = (cat: string) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  const addCategory = (cat: string) => {
    if (!categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
    }
    setShowAddCategory(false);
  };

  const availableCategories = allCategories.filter(c => !categories.includes(c));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Book</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl">&times;</button>
        </div>
        <input className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Categories</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map(cat => (
              <span key={cat} className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                {cat}
                <button onClick={() => removeCategory(cat)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 font-bold ml-1">X</button>
              </span>
            ))}
          </div>
          
          {showAddCategory ? (
            <div className="flex gap-2">
              <select
                className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                onChange={(e) => addCategory(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select category...</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button onClick={() => setShowAddCategory(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowAddCategory(true)} className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">+ Add category</button>
          )}
        </div>
        
        <button className="w-full p-3 bg-blue-500 dark:bg-blue-600 text-white rounded mb-2 hover:bg-blue-600 dark:hover:bg-blue-700 transition" onClick={handleUpdate}>Update Book</button>
        {showDeleteConfirm ? (
          <div className="flex gap-2">
            <button className="flex-1 p-3 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={() => { deleteBook(book.id); onClose(); }}>Confirm Delete</button>
            <button className="flex-1 p-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        ) : (
          <button className="w-full p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition" onClick={() => setShowDeleteConfirm(true)}>Delete Book</button>
        )}
        <button className="w-full p-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
