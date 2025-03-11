'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import Logo from '../../public/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="py-4" style={{ backgroundColor: darkMode ? '#121212' : '#F4F2ED' }}>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="OPBR App Logo" width={50} height={50} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
            className="hover:text-[#FF7F50] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/characters"
            style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
            className="hover:text-[#FF7F50] transition-colors"
          >
            Characters
          </Link>
          <Link
            href="/medal-sets"
            style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
            className="hover:text-[#FF7F50] transition-colors"
          >
            Medal Sets
          </Link>
          <Link
            href="/supports"
            style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
            className="hover:text-[#FF7F50] transition-colors"
          >
            Support
          </Link>
        </nav>

        {/* Search & Dark Mode Toggle (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div
            className="flex items-center py-1 px-3 rounded-full"
            style={{ backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF' }}
          >
            <Search className="h-5 w-5 text-gray-600" />
            <input
              className="ml-2 outline-none bg-transparent"
              style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
              type="text"
              placeholder="Search"
            />
          </div>
          <button onClick={toggleDarkMode} style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
          className="md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden py-4 px-4 space-y-4"
          style={{ backgroundColor: darkMode ? '#121212' : '#F4F2ED', color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
        >
          <Link href="/" className="block hover:text-[#FF7F50] transition-colors">
            Home
          </Link>
          <Link href="/characters" className="block hover:text-[#FF7F50] transition-colors">
            Characters
          </Link>
          <Link href="/medal-sets" className="block hover:text-[#FF7F50] transition-colors">
            Medal Sets
          </Link>
          <Link href="/supports" className="block hover:text-[#FF7F50] transition-colors">
            Support
          </Link>
          <div
            className="flex items-center py-1 px-3 rounded-full mt-4"
            style={{ backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF' }}
          >
            <Search className="h-5 w-5 text-gray-600" />
            <input
              className="ml-2 outline-none w-full bg-transparent"
              style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
              type="text"
              placeholder="Search"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 mt-4"
            style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
