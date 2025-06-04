'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useTheme from '@/contexts/ThemeContext';
import Tag from '@/components/Tag';
import { TagsClass } from '@/constants/tags';

interface Character {
  id: number;
  name: string;
  title: string;
  artwork: string;
  medal: string;
  medal_trait: string;
  class: string;
  color: string;
  character_tags: string[];
  medal_tags: string[];
  recommended_set?: string[];
  recommended_stats?: string;
  set_message?: string;
  stat_message?: string;
  guide?: string | null;
  alt_sets?: string[][];
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSetIndex, setSelectedSetIndex] = useState<number>(0);
  const [tagsClass, setTagsClass] = useState<string[]>([...TagsClass]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  const getCurrentSet = () => {
    if (!selectedCharacter) return null;

    const hasMainSet = selectedCharacter.recommended_set?.length > 0;

    if (selectedSetIndex === 0 && hasMainSet) {
      return {
        type: 'main',
        name: 'Primary Build',
        medals: selectedCharacter.recommended_set!,
        description: selectedCharacter.set_message || 'Primary recommended medal set'
      };
    }

    const altIndex = hasMainSet ? selectedSetIndex - 1 : selectedSetIndex;
    const altSet = selectedCharacter.alt_sets?.[altIndex];

    if (altSet) {
      return {
        type: 'alt',
        name: `Alternative Build ${altIndex + 1}`,
        medals: altSet,
        description: `Alternative medal combination ${altIndex + 1}`
      };
    }

    return null;
  };

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tagsModule = await import('@/constants/tags');
        if (tagsModule?.TagsClass && Array.isArray(tagsModule.TagsClass)) {
          setTagsClass(tagsModule.TagsClass);
        }
      } catch (error) {
        console.warn('Using default tags - failed to import TagsClass ', error);
      }
    };

    loadTags();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/character');

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch character data');
        }
        console.log(result.data);
        const characterData = result.data || [];
        setCharacters(characterData);
        setFilteredCharacters(characterData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error fetching characters:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleTagClick = useCallback(
    (tag: string) => {
      setSelectedTag((prevTag) => {
        if (prevTag === tag) {
          setFilteredCharacters(characters);
          return null;
        } else {
          const filtered = characters.filter((character) => character.class === tag);
          setFilteredCharacters(filtered);
          return tag;
        }
      });
    },
    [characters]
  );

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedSetIndex(0); // Reset to first set when opening character
  };

  const handleSetNavigation = (direction: 'prev' | 'next') => {
    const totalSets = getTotalSets();
    if (direction === 'prev') {
      setSelectedSetIndex((prev) => (prev > 0 ? prev - 1 : totalSets - 1));
    } else {
      setSelectedSetIndex((prev) => (prev < totalSets - 1 ? prev + 1 : 0));
    }
  };

  const getTotalSets = () => {
    if (!selectedCharacter) return 0;
    let count = 0;
    if (selectedCharacter.recommended_set?.length) count++;
    if (selectedCharacter.alt_sets?.length) count += selectedCharacter.alt_sets.length;
    return count;
  };

  useEffect(() => {
    if (selectedCharacter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCharacter]);

  if (isLoading) {
    return (
      <div
        className={`p-6 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading characters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-6 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Characters</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentSet = getCurrentSet();
  const totalSets = getTotalSets();

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Find the Best Guide for Your Favourite Characters</h2>

      <div className="flex flex-wrap justify-center mb-4">
        {tagsClass.map((tag, index) => (
          <Tag key={index} label={tag} onClick={() => handleTagClick(tag)} isSelected={selectedTag === tag} />
        ))}
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="text-center py-8">
          <p>No characters found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((character, index) => (
            <div
              key={character.id || index}
              className={`p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}
              onClick={() => handleCharacterSelect(character)}
            >
              <h2 className="text-xl font-bold mb-4 text-center">{character.name}</h2>

              <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
                <Image
                  src={character.artwork}
                  alt={character.name}
                  className="object-contain"
                  quality={85}
                  fill
                  priority={index < 6}
                />
              </div>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} my-2`}></div>

              <div className="w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCharacterSelect(character);
                  }}
                  className="w-full text-left text-blue-500 hover:underline py-1 flex items-center gap-1"
                  aria-label={`View details for ${character.name}`}
                >
                  <span>More Details</span> <FaArrowRight className="text-sm flex-shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div
          className="fixed inset-0 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} bg-opacity-5 flex items-center justify-center z-50 p-4 backdrop-blur-md"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl rounded-lg shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}
            >
              <div>
                <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
                <h3 className="text-lg font-semibold">{selectedCharacter.title}</h3>
              </div>

              <button
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setSelectedCharacter(null)}
                aria-label="Close details"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div>
                <h3 className="font-semibold text-lg mb-2">Character Tags:</h3>
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} flex flex-col space-y-1`}>
                  {Array.isArray(selectedCharacter.character_tags) &&
                    selectedCharacter.character_tags.map((tag, idx) => <p key={idx}>{tag}</p>)}
                </div>
              </div>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-4`}></div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Color:</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedCharacter.color || 'N/A'}</p>
              </div>

              <div className={`mt-4`}>
                <h3 className="font-semibold text-lg mb-2">Class:</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedCharacter.class || 'N/A'}</p>
              </div>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-4`}></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                <table className="w-full text-sm text-left">
                  <tbody>
                    <tr
                      className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <td className={`px-4 py-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} w-24`}>
                        <div className="w-16 h-16 relative mx-auto overflow-hidden">
                          {selectedCharacter.medal && (
                            <Image
                              src={selectedCharacter.medal}
                              alt="Character Medal"
                              className="rounded-md"
                              width={64}
                              height={64}
                              unoptimized
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{selectedCharacter.medal_trait || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`my-4 space-y-4`}>
                <h3 className="font-semibold text-lg mb-2">Medal Tags:</h3>
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} flex flex-col space-y-1`}>
                  {Array.isArray(selectedCharacter.medal_tags) &&
                    selectedCharacter.medal_tags.map((tag, idx) => <p key={idx}>{tag}</p>)}
                </div>

                {/* Enhanced Medal Sets Section with Alternative Sets */}
                {totalSets > 0 && (
                  <>
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-4`}></div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">
                          Medal Sets {totalSets > 1 && `(${selectedSetIndex + 1}/${totalSets})`}
                        </h3>
                        {totalSets > 1 && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSetNavigation('prev')}
                              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                              aria-label="Previous set"
                            >
                              <FaChevronLeft size={14} />
                            </button>
                            <button
                              onClick={() => handleSetNavigation('next')}
                              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                              aria-label="Next set"
                            >
                              <FaChevronRight size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {currentSet && (
                        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-lg">{currentSet.name}</h4>
                            {currentSet.type === 'main' && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}
                              >
                                Primary
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2 mb-3">
                            {currentSet.medals.map((medal, idx) => (
                              <div key={idx} className="relative w-16 h-16 overflow-hidden">
                                <Image
                                  src={medal}
                                  alt={`Medal ${idx + 1}`}
                                  className="object-contain"
                                  width={64}
                                  height={64}
                                  unoptimized
                                />
                              </div>
                            ))}
                          </div>

                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {currentSet.description}
                          </p>
                        </div>
                      )}

                      {/* Set Navigation Dots */}
                      {totalSets > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                          {Array.from({ length: totalSets }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedSetIndex(i)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                i === selectedSetIndex
                                  ? 'bg-blue-500'
                                  : darkMode
                                    ? 'bg-gray-600 hover:bg-gray-500'
                                    : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                              aria-label={`Go to set ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-4`}></div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Recommended Stats:</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {selectedCharacter.recommended_stats}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedCharacter?.stat_message || 'No information available'}
                  </p>
                </div>

                {selectedCharacter?.guide && (
                  <>
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-4`}></div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Guide:</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedCharacter?.guide}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
