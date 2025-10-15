
import React, { useState, useEffect, useCallback } from 'react';
import { getCommonPhrases } from '../services/geminiService';
import { Phrase, PhraseCategory } from '../types';
import { PHRASE_CATEGORIES } from '../constants';
import Card from './common/Card';
import Spinner from './common/Spinner';
import SpeakerButton from './common/SpeakerButton';

const Phrasebook: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>('greetings');
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhrases = useCallback(async (category: PhraseCategory) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPhrases = await getCommonPhrases(category);
      setPhrases(fetchedPhrases);
    } catch (err) {
      setError('Failed to load phrases. Please try a different category or try again later.');
      setPhrases([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhrases(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center text-brand-dark mb-6">Common Phrases</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {PHRASE_CATEGORIES.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              selectedCategory === id
                ? 'bg-brand-saffron text-white shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {isLoading && <Spinner />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!isLoading && !error && (
          <ul className="space-y-3">
            {phrases.map((phrase, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between transition hover:bg-gray-100">
                <div>
                  <p className="font-medium text-brand-dark">{phrase.english}</p>
                  <p className="font-hindi text-xl text-brand-blue">{phrase.hindi}</p>
                  <p className="text-sm text-gray-500 italic">{phrase.romanized}</p>
                </div>
                <SpeakerButton textToSpeak={phrase.hindi} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default Phrasebook;
