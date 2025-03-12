import Image from 'next/image';
import Logo from '../../public/images/logo.png';

interface MedalSetCardProps {
  medals: string[]; // Array of image URLs
  medalTraits: string[]; // Array of trait tags
}

const MedalSetCard: React.FC<MedalSetCardProps> = ({ medals, medalTraits }) => {
  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md">
      <div className="flex gap-2">
        {medals.map((img, idx) => (
          <img key={idx} src={img} alt={`Medal ${idx + 1}`} className="w-20 h-20 rounded-md" />
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {medalTraits.map((trait, idx) => (
          <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs mr-2">
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MedalSetCard;
