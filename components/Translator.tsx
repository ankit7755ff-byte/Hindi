
import React, { useState, useCallback } from 'react';
import { translateText } from '../services/geminiService';
import { TranslationResult } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import SpeakerButton from './common/SpeakerButton';

const Translator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const translation = await translateText(inputText);
      setResult(translation);
    } catch (err) {
      setError('Sorry, we couldn\'t get the translation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-center text-brand-dark">Translate to Hindi</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter English text here..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-saffron focus:border-transparent transition duration-200"
          rows={4}
        />
        <div className="text-center">
            <Button onClick={handleTranslate} isLoading={isLoading} disabled={isLoading || !inputText.trim()}>
                Translate
            </Button>
        </div>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        {result && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-brand-green rounded-r-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-hindi text-3xl text-brand-green">{result.hindi}</p>
                    <p className="text-gray-600 italic mt-1">{result.romanized}</p>
                </div>
                <SpeakerButton textToSpeak={result.hindi} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Translator;
