'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '../contexts/ThemeContext';
import Logo from '../../public/images/logo.png';
import NavLink from './NavLink';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const toggleDarkMode = theme?.toggleDarkMode ?? (() => {});

  return (
    <header className="py-4 shadow-md ${darkMode ? '#121212' : '#FAF9F6'}">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image src={Logo} alt="OPBR App Logo" width={50} height={50} priority />
        </Link>

        <nav className="hidden md:flex space-x-8">
          <NavLink href="/" title="Home" darkMode={darkMode} />
          <NavLink href="/characters" title="Characters" darkMode={darkMode} />
          <NavLink href="/medal-sets" title="Medal Sets" darkMode={darkMode} />
          <NavLink href="/supports" title="Support" darkMode={darkMode} />
        </nav>

        <button onClick={toggleDarkMode} className={`${darkMode ? '#EAEAEA' : '#1B1B1B'}`}>
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden ${darkMode ? '#EAEAEA' : '#1B1B1B'}`}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className={`md:hidden py-4 px-4 space-y-4 ${darkMode ? '#121212' : '#F4F2ED'}`}>
          <NavLink href="/" title="Home" darkMode={darkMode} />
          <NavLink href="/characters" title="Characters" darkMode={darkMode} />
          <NavLink href="/medal-sets" title="Medal Sets" darkMode={darkMode} />
          <NavLink href="/supports" title="Support" darkMode={darkMode} />
        </div>
      )}
    </header>
  );
};

export default Header;
