'use client';

import Link from 'next/link';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
  darkMode?: boolean;
}

const HeaderLink = ({ href, children, isMobile = false, darkMode = false }: HeaderLinkProps) => {
  const baseClasses = 'hover:text-[#FF7F50] transition-colors';
  const mobileClasses = 'block';
  const colorClasses = darkMode ? 'text-[#EAEAEA]' : 'text-[#1B1B1B]';

  return (
    <Link href={href} className={`${baseClasses} ${isMobile ? mobileClasses : ''} ${colorClasses}`}>
      {children}
    </Link>
  );
};

export default HeaderLink;
