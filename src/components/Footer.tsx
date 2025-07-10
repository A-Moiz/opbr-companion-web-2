'use client';

import { useEffect, useState } from 'react';
import useTheme from '@/contexts/ThemeContext';
import { FiArrowUp } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-20 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} OPBR Companion. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://apps.apple.com/gb/app/opbr-companion/id6737994116"
              target="_blank"
              className="flex items-center justify-center px-4 py-2 rounded-lg transition-all bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FaApple className="mr-2 text-white" size={18} />
              <span className="font-medium">App Store</span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=app.opbrcompanion"
              target="_blank"
              className="flex items-center justify-center px-4 py-2 rounded-lg transition-all bg-green-600 hover:bg-green-700 text-white"
            >
              <FaGooglePlay className="mr-2 text-white" size={16} />
              <span className="font-medium">Google Play</span>
            </a>
          </div>
        </div>
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 flex items-center justify-center h-10 w-10 rounded-full shadow-lg transition-all bg-blue-600 hover:bg-purple-700 text-white"
          aria-label="Back to top"
        >
          <FiArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
