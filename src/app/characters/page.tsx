'use client';
import CharacterCards from '@/components/CharacterCard';

const Characters = () => {
  const characters = [
    { name: 'Luffy', image: 'https://drive.google.com/uc?export=view&id=16ADdwgQ1sf4Mn-6oBLBNU2Sk5aFBoJYw' },
    { name: 'Zoro', image: 'https://drive.google.com/uc?export=view&id=1YVgG-RPXkLf3IxfGY0ECSDQRUBUoD7OL' },
    { name: 'Sanji', image: 'https://drive.google.com/uc?export=view&id=19sMwYevl8f5pCBSUiFYZlSNG_PBCv25I' },
    { name: 'Shanks', image: 'https://drive.google.com/uc?export=view&id=1BJ4qx5WCC_pi-mUw4Aj4UE6sdbS49rTp' },
    { name: 'Kalgara', image: 'https://drive.google.com/uc?export=view&id=1MW_SearF1i17s7poLVrYFVqQhS5_eKnd' },
    { name: 'Garp', image: 'https://drive.google.com/uc?export=view&id=1Hv5rfQm0lP5FF59LjAbTozuRH4XdLjrR' }
  ];

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-6"> Find the Best Guide for Your Favourite Characters</h2>
      <p className="text-center mb-4">Note: More Characters will be added in the future.</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pb-16">
        {characters.map((char, idx) => (
          <div key={idx} className="flex justify-center p-0">
            <CharacterCards name={char.name} image={char.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
