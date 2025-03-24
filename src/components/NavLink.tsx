import Link from 'next/link';

interface NavLinkProps {
  href: string;
  title: string;
  darkMode: boolean;
}

const NavLink = ({ href, title, darkMode }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`block text-xl font-medium transition-transform duration-300 ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      } hover:text-[#FF7F50] hover:scale-105`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
