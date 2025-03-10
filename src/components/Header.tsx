import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

const Header = () => {
  return (
    <header className="navbar">
      <Image src={logo} alt="OPBR App Logo" className="logo-image" />
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
