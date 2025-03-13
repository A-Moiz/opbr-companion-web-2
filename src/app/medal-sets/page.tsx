'use client';
import MedalSetCard from '@/components/MedalSetCard';
import { useEffect, useState } from 'react';
import supabase from '../../database/supabaseClient';

interface MedalSet {
  id: string;
  medals: string[];
  medal_traits: string[];
}

const MedalSets = () => {
  const [medalSets, setMedalSets] = useState<MedalSet[]>([]);

  useEffect(() => {
    const fetchMedalSets = async () => {
      const { data, error } = await supabase.from('medal_set').select('medals, medal_traits');

      if (error) {
        console.error('Error fetching medal sets:', error.message);
      } else {
        console.log('Fetched Medal Sets:', data);
        setMedalSets(data as MedalSet[]);
      }
    };

    fetchMedalSets();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 ">Medal Sets</h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medalSets.map((medalSet, index) => (
          <MedalSetCard key={index} medals={medalSet.medals} medalTraits={medalSet.medal_traits} />
        ))}
      </div>
    </div>
  );
};

export default MedalSets;
