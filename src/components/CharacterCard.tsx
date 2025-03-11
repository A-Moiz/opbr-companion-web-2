import Image from 'next/image';

export default function CharacterCards() {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
          width={100}
          height={100}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Card Title</h2>
      </div>
    </div>
  );
}
