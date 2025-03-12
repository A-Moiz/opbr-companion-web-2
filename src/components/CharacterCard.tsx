import Image from 'next/image';

interface CharacterCardProps {
  name: string;
  image: string;
}

export default function CharacterCards({ name, image }: CharacterCardProps) {
  return (
    <div
      className={`w-64 h-60 p-4 rounded-xl shadow-md transition-colors flex flex-col items-center ${'bg-gray-200 text-black'}`}
    >
      <figure className="flex justify-center pt-2">
        <Image src={image} alt={name} className="rounded-2xl" width={120} height={120} />
      </figure>
      <div className="text-center mt-3">
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    </div>
  );
}
