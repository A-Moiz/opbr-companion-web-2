'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../contexts/ThemeContext';
import Logo from '../../public/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const toggleDarkMode = theme?.toggleDarkMode ?? (() => {});

  return (
    <header className="py-4 shadow-md" style={{ backgroundColor: darkMode ? '#121212' : '#FAF9F6' }}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image src={Logo} alt="OPBR App Logo" width={50} height={50} priority />
        </Link>

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

        <button onClick={toggleDarkMode} style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}>
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: darkMode ? '#EAEAEA' : '#1B1B1B' }}
          className="md:hidden"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

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
        </div>
      )}
    </header>
  );
};

export default Header;
