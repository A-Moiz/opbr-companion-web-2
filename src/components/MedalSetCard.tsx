'use client';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import useTheme from '../contexts/ThemeContext';

interface MedalSetCardProps {
  medals: string[];
  medalTraits: string[];
  onViewDetails: () => void;
}

const MedalSetCard = ({ medals, medalTraits, onViewDetails }: MedalSetCardProps) => {
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-base-100'}`}>
      <div className="flex gap-2">
        {medals.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Medal ${idx + 1}`}
            className="w-20 h-20 rounded-md"
            width={120}
            height={120}
          />
        ))}
      </div>
      <div className="mt-2 text-sm">
        {medalTraits.map((trait, idx) => (
          <span
            key={idx}
            className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} px-2 py-1 rounded-md text-xs mr-2 inline-block`}
          >
            {trait}
          </span>
        ))}
      </div>

      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} my-2`} />

      <button
        onClick={onViewDetails}
        className="w-full text-left text-blue-500 hover:underline py-1 flex items-center gap-1"
      >
        More Details <FaArrowRight className="text-sm" />
      </button>
    </div>
  );
};

export default MedalSetCard;
