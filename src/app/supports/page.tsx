'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import useTheme from '@/contexts/ThemeContext';
import Tag from '@/components/Tag';
import { IoIosPricetag } from 'react-icons/io';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

interface Support {
  id: number;
  created_at: string;
  updated_at: string | null;
  support_img: string;
  support_color: string;
  support_tags: string[];
}

const SupportCards = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [filteredSupports, setFilteredSupports] = useState<Support[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState<boolean>(false);
  const [isColorsExpanded, setIsColorsExpanded] = useState<boolean>(false);
  const tagsRef = React.useRef<HTMLDivElement>(null);
  const colorsRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  // Colors from your filter list
  const availableColors = useMemo(() => ['Red', 'Green', 'Blue', 'Light', 'Dark'], []);

  // Tags from your filter list
  const availableTags = useMemo(
    () => [
      'Attacker',
      'Defender',
      'Runner',
      'East Blue',
      'Navy',
      'The Seven Warlords of the Sea',
      'Straw Hat Pirates',
      'Whitebeard Pirates',
      'Don Quixote Family',
      'Paramecia',
      'Zoan',
      'Logia',
      'Captain',
      'The Grand Line',
      'New World',
      'Worst Generation',
      'Charlotte Family',
      'Kozuki Clan / Kozuki Clan Servant',
      'Animal Kingdom Pirates',
      'Revolutionary Army',
      'Roger Pirates / Ex-Roger Pirates',
      'Fish-Man'
    ],
    []
  );

  // Extract colors from support data
  const allColors = useMemo(() => {
    const colorSet = new Set<string>();
    supports.forEach((support) => {
      if (support.support_color) {
        const colors = support.support_color.split(', ');
        colors.forEach((color) => colorSet.add(color.trim()));
      }
    });
    return Array.from(colorSet);
  }, [supports]);

  // Extract tags from support data
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    supports.forEach((support) => {
      if (support.support_tags) {
        support.support_tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [supports]);

  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const response = await fetch('/api/support');
        if (!response.ok) {
          console.error('Error fetching supports:', response.statusText);
          return;
        }
        const result = await response.json();
        if (!result?.success) {
          console.error('Error fetching supports:', result?.message);
          return;
        }
        setSupports(result?.data ?? []);
        setFilteredSupports(result?.data ?? []);
      } catch (error) {
        console.error('Error fetching supports:', error);
      }
    };
    fetchSupports();
  }, []);

  useEffect(() => {
    setFilteredSupports(
      supports.filter((support) => {
        const hasMatchingTag =
          selectedTags.length === 0 || selectedTags.some((tag) => support.support_tags?.includes(tag));

        const hasMatchingColor =
          selectedColors.length === 0 || selectedColors.some((color) => support.support_color?.includes(color));

        return hasMatchingTag && hasMatchingColor;
      })
    );
  }, [selectedTags, selectedColors, supports]);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const handleColorClick = useCallback((color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  }, []);

  // References for expanded content
  const tagsContentRef = React.useRef<HTMLDivElement>(null);
  const colorsContentRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside to close expanded filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // For Tags filter
      const isClickInsideTagsButton = tagsRef.current && tagsRef.current.contains(event.target as Node);
      const isClickInsideTagsContent = tagsContentRef.current && tagsContentRef.current.contains(event.target as Node);

      if (!isClickInsideTagsButton && !isClickInsideTagsContent && isTagsExpanded) {
        setIsTagsExpanded(false);
      }

      // For Colors filter
      const isClickInsideColorsButton = colorsRef.current && colorsRef.current.contains(event.target as Node);
      const isClickInsideColorsContent =
        colorsContentRef.current && colorsContentRef.current.contains(event.target as Node);

      if (!isClickInsideColorsButton && !isClickInsideColorsContent && isColorsExpanded) {
        setIsColorsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTagsExpanded, isColorsExpanded]);

  // Split color string into array of individual colors
  const parseColors = (colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(', ').map((color) => color.trim());
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Browse Support Cards & Find the Best Fit for Your Characters
        </h2>

        <div className="bg-opacity-70 backdrop-blur-sm rounded-lg p-4 mb-8 shadow-md">
          <div className="flex flex-wrap gap-4 justify-center">
            <div ref={tagsRef} className="flex-1 min-w-64">
              <button
                onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-opacity-20 bg-gray-500 hover:bg-opacity-30 transition-all"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <IoIosPricetag className="inline" />
                  <span>Types</span>
                </h3>
                {isTagsExpanded ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
              </button>

              {selectedTags.length > 0 && !isTagsExpanded && (
                <p className="text-center text-sm mt-2">
                  <span className="font-medium">Selected: </span>
                  {selectedTags.length > 0
                    ? selectedTags.length > 2
                      ? `${selectedTags.slice(0, 2).join(', ')} +${selectedTags.length - 2} more`
                      : selectedTags.join(', ')
                    : 'None'}
                </p>
              )}
            </div>

            <div ref={colorsRef} className="flex-1 min-w-64">
              <button
                onClick={() => setIsColorsExpanded(!isColorsExpanded)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-opacity-20 bg-gray-500 hover:bg-opacity-30 transition-all"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <IoColorPaletteOutline className="inline" />
                  <span>Colors</span>
                </h3>
                {isColorsExpanded ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
              </button>

              {selectedColors.length > 0 && !isColorsExpanded && (
                <p className="text-center text-sm mt-2">
                  <span className="font-medium">Selected: </span>
                  {selectedColors.length > 0
                    ? selectedColors.length > 2
                      ? `${selectedColors.slice(0, 2).join(', ')} +${selectedColors.length - 2} more`
                      : selectedColors.join(', ')
                    : 'None'}
                </p>
              )}
            </div>
          </div>

          {/* Expanded content section - appears below the buttons */}
          <div className="mt-4">
            {isTagsExpanded && (
              <div ref={tagsContentRef} className="mb-6 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {availableTags.map((tag, index) => (
                    <Tag
                      key={index}
                      label={tag}
                      onClick={() => handleTagClick(tag)}
                      isSelected={selectedTags.includes(tag)}
                    />
                  ))}
                </div>
                <p className="text-center text-sm">
                  <span className="font-medium">Selected Types:</span>{' '}
                  {selectedTags.length > 0 ? selectedTags.join(', ') : 'None selected'}
                </p>
              </div>
            )}

            {isColorsExpanded && (
              <div ref={colorsContentRef} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {availableColors.map((color, index) => (
                    <Tag
                      key={index}
                      label={color}
                      onClick={() => handleColorClick(color)}
                      isSelected={selectedColors.includes(color)}
                    />
                  ))}
                </div>
                <p className="text-center text-sm">
                  <span className="font-medium">Selected Colors:</span>{' '}
                  {selectedColors.length > 0 ? selectedColors.join(', ') : 'None selected'}
                </p>
              </div>
            )}
          </div>
        </div>

        {filteredSupports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">No support cards match your current filters</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => {
                setSelectedTags([]);
                setSelectedColors([]);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupports.map(({ id, support_img, support_color, support_tags }) => {
              const colors = parseColors(support_color);

              return (
                <div
                  key={id}
                  className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
                    darkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={support_img}
                      alt={`Support Card ${id}`}
                      className="rounded-t-lg object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-4">
                      <IoIosPricetag size={18} className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tags:</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {support_tags?.join(', ') ?? 'None'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <IoColorPaletteOutline
                        size={18}
                        className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Colors:</p>
                        <div className="flex items-center mt-1 gap-2">
                          <div className="flex gap-1">
                            {colors.map((color, idx) => (
                              <span
                                key={idx}
                                className="w-5 h-5 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                              />
                            ))}
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {support_color ?? 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportCards;
