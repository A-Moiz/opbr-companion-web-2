'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import useTheme from '@/contexts/ThemeContext';
import Tag from '@/components/Tag';
import { IoIosPricetag } from 'react-icons/io';
import { IoColorPaletteOutline } from 'react-icons/io5';

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
  const theme = useTheme();
  const darkMode = theme?.darkMode ?? false;

  // Colors from your filter list
  const availableColors = useMemo(() => ['Red', 'Green', 'Blue', 'Light', 'Dark'], []);

  // Combined Tags list
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
      'Fish-Man',
      'Devil Fruit',
      'Swordsman',
      'Supernova',
      'Marine',
      'Pirate',
      'Wano',
      'Thriller Bark'
    ],
    []
  );

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

  const isTagSelected = useCallback(
    (tag: string) => {
      return selectedTags.includes(tag);
    },
    [selectedTags]
  );

  const handleColorClick = useCallback((color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  }, []);

  // Split color string into array of individual colors
  const parseColors = useCallback((colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(', ').map((color) => color.trim());
  }, []);

  // Get color class based on color name
  const getColorClass = useCallback((color: string): string => {
    const colorMap: Record<string, string> = {
      red: 'bg-red-500',
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      light: 'bg-gray-300',
      dark: 'bg-gray-800'
    };

    return colorMap[color.toLowerCase()] || 'bg-gray-400';
  }, []);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Browse Support Cards & Find the Best Fit for Your Characters
        </h2>

        {/* Types filter section - matches MedalSets style */}
        <div className="flex flex-wrap justify-center mb-4">
          <div className="mb-4 mr-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Types</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {availableTags.map((tag, index) => (
                <Tag key={index} label={tag} onClick={handleTagClick} isSelected={isTagSelected(tag)} />
              ))}
            </div>
          </div>
        </div>

        {/* Colors filter section - matches MedalSets style */}
        <div className="flex flex-wrap justify-center mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Colors</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {availableColors.map((color, index) => (
                <Tag
                  key={index}
                  label={color}
                  onClick={() => handleColorClick(color)}
                  isSelected={selectedColors.includes(color)}
                />
              ))}
            </div>
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
                                className={`w-5 h-5 rounded-full border border-gray-300 ${getColorClass(color)}`}
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
