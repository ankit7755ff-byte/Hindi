
import React, { useState, useCallback } from 'react';
import { identifyImage } from '../services/geminiService';
import { TranslationResult } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import SpeakerButton from './common/SpeakerButton';

const ImageIdentifier: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return await base64EncodedDataPromise;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > 2 * 1024 * 1024) { // 2MB limit
          setError("Please upload an image smaller than 2MB.");
          return;
      }
      setError(null);
      setResult(null);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      fileToGenerativePart(file).then(setImageBase64);
    }
  };

  const handleIdentify = useCallback(async () => {
    if (!imageFile || !imageBase64) {
      setError('Please select an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const identification = await identifyImage(imageBase64, imageFile.type);
      setResult(identification);
    } catch (err) {
      setError('Sorry, we couldn\'t identify the image. Please try another one.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, imageBase64]);

  return (
    <Card>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold text-center text-brand-dark">What's this in Hindi?</h2>
        
        <div className="w-full max-w-sm h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          {previewUrl ? (
            <img src={previewUrl} alt="Upload preview" className="max-h-full max-w-full object-contain rounded-md" />
          ) : (
            <p className="text-gray-500">Upload an image to identify</p>
          )}
        </div>
        
        <input
            type="file"
            id="file-upload"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="sr-only"
        />
        <label htmlFor="file-upload" className="cursor-pointer bg-white text-brand-blue font-semibold py-2 px-4 border border-brand-blue rounded-lg hover:bg-blue-50 transition-colors">
            {imageFile ? `Selected: ${imageFile.name}` : 'Choose Image'}
        </label>
        
        <Button onClick={handleIdentify} isLoading={isLoading} disabled={isLoading || !imageFile}>
          Identify Object
        </Button>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {result && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-brand-green rounded-r-lg w-full max-w-sm">
            <p className="text-sm text-gray-500">The object is called:</p>
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

export default ImageIdentifier;
