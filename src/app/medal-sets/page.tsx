'use client';
import { useEffect, useState } from 'react';
import supabase from '../../database/supabaseClient';
import Image from 'next/image';
import { FaArrowRight, FaTimes } from 'react-icons/fa';

interface MedalSet {
  id: string;
  name: string;
  medals: string[];
  medal_traits: string[];
  best_for: string;
  description: string;
  tags: string[];
}

const MedalSets = () => {
  const [medalSets, setMedalSets] = useState<MedalSet[]>([]);
  const [selectedMedalSet, setSelectedMedalSet] = useState<MedalSet | null>(null);

  useEffect(() => {
    const fetchMedalSets = async () => {
      const { data, error } = await supabase.from('medal_set').select('*');

      if (error) {
        console.error('Error fetching medal sets:', error.message);
      } else {
        console.log('Fetched Medal Sets:', JSON.stringify(data, null, 2));
        setMedalSets(data as MedalSet[]);
      }
    };

    fetchMedalSets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Medal Sets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medalSets.map((medalSet, index) => (
          <div key={index} className="p-4 bg-base-100 rounded-lg shadow-md">
            <div className="flex gap-2">
              {medalSet.medals.slice(0, 3).map((img, idx) => (
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
              {medalSet.medal_traits.map((trait, idx) => (
                <span key={idx} className=" text-white px-2 py-1 rounded-md mr-2 inline-block">
                  {trait}
                </span>
              ))}
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <button
              onClick={() => setSelectedMedalSet(medalSet)}
              className="w-full text-left text-blue-500 hover:underline py-1 flex items-center gap-1"
            >
              More Details <FaArrowRight className="text-sm" />
            </button>
          </div>
        ))}
      </div>
      {selectedMedalSet && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center backdrop-blur-md"
          onClick={() => setSelectedMedalSet(null)}
        >
          <div className="bg-base-100 w-3/4 p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedMedalSet(null)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedMedalSet.name}</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-white">
                <tbody>
                  {selectedMedalSet.medals.map((img, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? 'bg-gray-700' : 'bg-transparent'} border-b border-gray-700`}
                    >
                      <td className="px-6 py-4 border-r border-gray-700">
                        <Image
                          src={img}
                          alt={`Medal ${idx + 1}`}
                          className="w-20 h-20 rounded-md"
                          width={120}
                          height={120}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">{selectedMedalSet.medal_traits[idx] || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-300 my-3"></div>
            <p className="font-semibold">Best for:</p>
            <p className="text-white mb-3">{selectedMedalSet.best_for || 'N/A'}</p>
            <div className="border-t border-gray-300 my-3"></div>
            <p className="font-semibold">Description:</p>
            <p className="text-white mb-3">{selectedMedalSet.description || 'No description available'}</p>
            <div className="border-t border-gray-300 my-3"></div>
            <p className="font-semibold">Tags:</p>
            <ul className="list-disc list-inside text-white mb-3">
              {selectedMedalSet.tags && selectedMedalSet.tags.length > 0 ? (
                selectedMedalSet.tags.map((tag, idx) => <li key={idx}>{tag}</li>)
              ) : (
                <li>No tags</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedalSets;
