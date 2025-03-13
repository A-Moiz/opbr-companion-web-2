import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

interface MedalSetCardProps {
  medals: string[];
  medalTraits: string[];
}

const MedalSetCard: React.FC<MedalSetCardProps> = ({ medals, medalTraits }) => {
  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md">
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
      <div className="mt-2 text-sm text-gray-600">
        {medalTraits.map((trait, idx) => (
          <span key={idx} className=" text-white px-2 py-1 rounded-md text-xs mr-2 inline-block">
            {trait}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-2"></div>

      {/* Button-like Link with pointer icon */}
      <button className="w-full text-left text-blue-500 hover:underline py-1 flex items-center gap-1">
        More Details <FaArrowRight className="text-sm" />
      </button>
    </div>
  );
};

export default MedalSetCard;
