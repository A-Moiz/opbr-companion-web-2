'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../contexts/ThemeContext';
import Logo from '../../public/images/logo.png';
import HeaderLink from './HeaderLink';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const toggleDarkMode = theme?.toggleDarkMode ?? (() => {});
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/characters', label: 'Characters' },
    { href: '/medal-sets', label: 'Medal Sets' },
    { href: '/supports', label: 'Support' }
  ];

  return (
    <header className={`py-4 shadow-md ${darkMode ? 'bg-[#121212]' : 'bg-[#FAF9F6]'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image src={Logo} alt="OPBR App Logo" width={50} height={50} priority className="object-cover" />
        </Link>

        <nav className="hidden md:flex space-x-8">
          {navigationLinks.map((link) => (
            <HeaderLink key={link.href} href={link.href} darkMode={darkMode}>
              {link.label}
            </HeaderLink>
          ))}
        </nav>

        <button onClick={toggleDarkMode} className={`${darkMode ? 'text-[#EAEAEA]' : 'text-[#1B1B1B]'}`}>
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${darkMode ? 'text-[#EAEAEA]' : 'text-[#1B1B1B]'}`}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`md:hidden py-4 px-4 space-y-4 ${darkMode ? 'bg-[#121212] text-[#EAEAEA]' : 'bg-[#F4F2ED] text-[#1B1B1B]'}`}
        >
          {navigationLinks.map((link) => (
            <HeaderLink key={link.href} href={link.href} darkMode={darkMode} isMobile>
              {link.label}
            </HeaderLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
