import Image from 'next/image';

interface CharacterCardProps {
  name: string;
  image: string;
}

export default function CharacterCards({ name, image }: CharacterCardProps) {
  return (
    <div
      className={`w-60 h-60 p-4 rounded-xl shadow-md transition-colors flex flex-col items-center bg-base-100 text-white`}
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
