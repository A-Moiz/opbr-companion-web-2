import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.png';

const Header = () => {
  return (
    <header>
      <Image src={logo} alt="OPBR App Logo" />
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/characters">Characters</Link>
          </li>
          <li>
            <Link href="/medal-sets">Medal Sets</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
