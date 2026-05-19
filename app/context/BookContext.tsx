'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  categories: string[];
  addedAt: Date;
};

type BookContextType = {
  books: Book[];
  categories: string[];
  addBook: (book: Omit<Book, 'id' | 'addedAt'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
};

const defaultCategories = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Biography'];
const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);

  const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    fetch('/api/books', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.books) {
          setBooks(data.books);
          const allCategories = new Set<string>(defaultCategories.map(c => toTitleCase(c)));
          data.books.forEach((b: Book) => {
            b.categories.forEach(c => allCategories.add(toTitleCase(c)));
          });
          setCategories(Array.from(allCategories).sort((a, b) => a.localeCompare(b)));
        }
      });
  }, []);

  const addBook = async (book: Omit<Book, 'id' | 'addedAt'>) => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', data: book })
    });
    const data = await res.json();
    if (data.book) {
      setBooks(prev => [...prev, data.book].sort((a, b) => a.title.localeCompare(b.title)));
      const newCategories = new Set([...categories, ...book.categories.map(c => toTitleCase(c))]);
      setCategories(Array.from(newCategories).sort((a, b) => a.localeCompare(b)));
    }
  };

  const updateBook = async (updatedBook: Book) => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', data: updatedBook })
    });
    const data = await res.json();
    if (data.book) {
      setBooks(prev => prev.map(b => b.id === data.book.id ? data.book : b).sort((a, b) => a.title.localeCompare(b.title)));
    }
  };

  const deleteBook = async (id: string) => {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', data: { id } })
    });
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, categories, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks must be used within a BookProvider');
  return context;
};