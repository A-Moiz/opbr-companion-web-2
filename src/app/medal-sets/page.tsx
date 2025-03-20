'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import useTheme from '@/contexts/ThemeContext';
import Tag from '@/components/Tag';

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
  const [filteredMedalSets, setFilteredMedalSets] = useState<MedalSet[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;
  const tags = ['Attacker', 'Runner', 'Defender'];

  useEffect(() => {
    const fetchMedalSets = async () => {
      try {
        const response = await fetch('/api/medal-sets');

        if (!response.ok) {
          console.error('Error fetching medal sets:', response.statusText);
          return;
        }

        const result = await response.json();

        if (!result.success) {
          console.error('Error fetching medal sets:', result.message);
          return;
        }

        setMedalSets(result.data);
        setFilteredMedalSets(result.data);
      } catch (error) {
        console.error('Error fetching medal sets:', error);
      }
    };

    fetchMedalSets();
  }, []);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredMedalSets(medalSets);
    } else {
      const filtered = medalSets.filter((medalSet) => medalSet.best_for === tag);
      setFilteredMedalSets(filtered);
      setSelectedTag(tag);
    }
  };

  useEffect(() => {
    if (selectedMedalSet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMedalSet]);

  const processedMedalSets = useMemo(() => {
    return (
      filteredMedalSets?.map((medalSet) => ({
        ...medalSet,
        displayMedals: medalSet?.medals?.slice(0, 3) || [],
        displayTraits: medalSet?.medal_traits || []
      })) || []
    );
  }, [filteredMedalSets]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Browse Medal Sets & Find the Best Fit for Your Characters</h2>
      <p className="text-center mb-4">Note: More supports will be added in the future.</p>

      <div className="flex flex-wrap justify-center mb-4">
        {tags.map((tag, index) => (
          <Tag key={index} label={tag} onClick={handleTagClick} isSelected={selectedTag === tag} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedMedalSets.map((medalSet, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <h2 className="text-xl font-bold mb-4">{medalSet?.name}</h2>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
              {medalSet?.displayMedals?.map((img, idx) => (
                <div key={idx} className="w-20 h-20 relative">
                  <Image src={img} alt={`Medal ${idx + 1}`} className="rounded-md object-contain" fill />
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm">
              {medalSet?.displayTraits?.map((trait, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-md text-xs mr-2 inline-block ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} my-2`}></div>
            <div className="w-full">
              <button
                onClick={() => setSelectedMedalSet(medalSet)}
                className="w-full text-left text-blue-500 hover:underline py-1 flex items-center gap-1"
              >
                <span>More Details</span> <FaArrowRight className="text-sm flex-shrink-0" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMedalSet && (
        <div
          className="fixed inset-0 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-5 flex items-center justify-center z-50 p-4 backdrop-blur-md"
          onClick={() => setSelectedMedalSet(null)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl rounded-lg shadow-lg relative max-h-full overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-4 sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}
            >
              <h2 className="text-xl font-bold">{selectedMedalSet?.name}</h2>
              <button
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setSelectedMedalSet(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {selectedMedalSet?.medals?.map((img, idx) => (
                      <tr
                        key={idx}
                        className={`${idx % 2 === 0 ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <td className={`px-4 py-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} w-24`}>
                          <div className="w-16 h-16 relative mx-auto">
                            <Image src={img} alt={`Medal ${idx + 1}`} className="rounded-md" width={64} height={64} />
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{selectedMedalSet?.medal_traits?.[idx] || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`my-4 space-y-4`}>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Best for:</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedMedalSet?.best_for || 'N/A'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Description:</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedMedalSet?.description || 'No description available'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tags:</h3>
                  <div className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} flex flex-col`}>
                    {selectedMedalSet?.tags && selectedMedalSet.tags.length > 0 ? (
                      selectedMedalSet.tags.map((tag, idx) => <p key={idx}>{tag}</p>)
                    ) : (
                      <p>No tags</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedalSets;
