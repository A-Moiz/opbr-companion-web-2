'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaMedal, FaHandHoldingHeart } from 'react-icons/fa';
import useTheme from '../contexts/ThemeContext';
import Images from '@/data/images.json';

const Home = () => {
  // useEffect(() => {
  //   const fetchExampleData = async () => {
  //     try {
  //       const response = await fetch('/api/home');
  //       const data = await response.json();
  //       console.log('Example data:', data);
  //     } catch (error) {
  //       console.error('Error fetching example data:', error);
  //     }
  //   };
  //   fetchExampleData();
  // }, []);

  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  const featuredCards = [
    {
      title: 'Characters',
      description: 'Discover top-tier characters and their abilities',
      icon: <FaUsers size={32} />,
      link: '/characters'
    },
    {
      title: 'Medal Sets',
      description: 'Optimize your battle strategy with perfect medal combinations',
      icon: <FaMedal size={32} />,
      link: '/medal-sets'
    },
    {
      title: 'Support',
      description: 'Enhance your team with the best support characters',
      icon: <FaHandHoldingHeart size={32} />,
      link: '/supports'
    }
  ];

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-100 text-gray-900'}`}
    >
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${darkMode ? 'bg-black opacity-70' : 'bg-white opacity-30'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 dark:from-transparent dark:to-gray-900"></div>
          <Image src={Images.banners[0].url} alt="OPBR Background" fill priority className="z-[-1] object-cover" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="mb-8">
            <Image src="/images/logo.png" alt="OPBR Companion Logo" width={150} height={150} className="mx-auto mb-8" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">OPBR Companion</h1>

          <h2 className="text-xl md:text-2xl font-medium mb-8 text-white drop-shadow-md">
            YOUR guide to reach the top leagues
          </h2>

          <div>
            <Link href="/characters">
              <button className="px-8 py-3 bg-[#FF7F50] hover:bg-[#FF6347] text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Dominate the Battlefield</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCards.map((card, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <Link href={card.link}>
                  <div className="text-center">
                    <div className="mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                          darkMode ? 'bg-gray-700 text-[#FF7F50]' : 'bg-[#FF7F50] bg-opacity-20 text-[#FF7F50]'
                        }`}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{card.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image src={Images.banners[1].url} alt="New Character Release" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">New Character Release!</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Check out the latest character addition to the game and our analysis.
                </p>
                <Link href="/characters">
                  <p className="text-[#FF7F50] font-medium hover:underline">Read More</p>
                </Link>
              </div>
            </div>

            <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="relative h-48">
                <Image src={Images.banners[2].url} alt="Medal Set Strategy" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Discover the best sets for each class!</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Discover the best medal combinations to dominate in the current meta.
                </p>
                <Link href="/medal-sets">
                  <p className="text-[#FF7F50] font-medium hover:underline">Read More</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
