'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '@/contexts/ThemeContext';
import LogoTwo from '../../public/icon.png';
import NavLink from './NavLink';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const toggleDarkMode = theme?.toggleDarkMode ?? (() => {});

  // Navigation links
  const navLinks = [
    { href: '/', title: 'Home' },
    { href: '/characters', title: 'Characters' },
    { href: '/medal-sets', title: 'Medal Sets' },
    { href: '/supports', title: 'Support' }
  ];

  return (
    <header className={`py-4 shadow-md ${darkMode ? 'bg-[#121212]' : 'bg-[#FAF9F6]'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image src={LogoTwo} alt="OPBR App Logo" width={50} height={50} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ href, title }) => (
            <NavLink
              key={href}
              href={href}
              title={title}
              darkMode={darkMode}
              textColor={pathname === href ? 'text-blue-500 font-bold' : undefined}
            />
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className={`${darkMode ? 'text-[#EAEAEA]' : 'text-[#1B1B1B]'}`}>
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${darkMode ? 'text-[#EAEAEA]' : 'text-[#1B1B1B]'}`}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col items-start py-4 px-4 space-y-4 ${darkMode ? 'bg-[#121212]' : 'bg-[#F4F2ED]'}`}
        >
          {navLinks.map(({ href, title }) => (
            <NavLink
              key={href}
              href={href}
              title={title}
              darkMode={darkMode}
              textColor={pathname === href ? 'text-blue-500 font-bold' : darkMode ? 'text-white' : 'text-black'}
              className={`px-3 py-2 rounded-md transition-colors duration-200 w-full hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
