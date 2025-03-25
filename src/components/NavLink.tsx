import Link from 'next/link';

interface NavLinkProps {
  href: string;
  title: string;
  darkMode: boolean;
  textColor?: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, title, darkMode, textColor, className = '' }) => {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md transition-colors duration-200 ${
        textColor ? textColor : darkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'
      } ${className}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
