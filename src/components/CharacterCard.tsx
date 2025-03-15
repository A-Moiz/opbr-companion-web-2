'use client';

import useTheme from '@/contexts/ThemeContext';
import Image from 'next/image';
interface CharacterCardProps {
  name: string;
  image: string;
}

export default function CharacterCards({ name, image }: CharacterCardProps) {
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  return (
    <div
      className={`w-60 h-60 p-4 rounded-xl shadow-md transition-colors flex flex-col items-center  ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      <figure className="flex justify-center pt-2">
        <Image src={image} alt={name} className="rounded-2xl" width={175} height={175} />
      </figure>
      <div className="text-center mt-3">
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    </div>
  );
}
