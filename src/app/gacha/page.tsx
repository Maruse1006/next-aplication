'use client';
import { useState } from 'react';

interface Monster {
  id: number;
  name: string;
  rarity: 'N' | 'SR' | 'SSR';
  imageUrl: string;
}

const GachaPage = () => {
  const [monster, setMonster] = useState<Monster | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pullGacha = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setMonster(null);

    try {
      const response = await fetch('/api/gacha');
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'ガチャに失敗しました');
        return;
      }
      
      const data = await response.json();
      setMonster(data.monster);
    } catch (error) {
      setErrorMessage('ガチャに失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 gap-8">
      <h1 className="text-center text-2xl font-semibold mb-4">モンスターガチャ</h1>
      
      <button
        onClick={pullGacha}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg border-2 border-black shadow-lg transform transition-transform duration-200 hover:scale-105"
      >
        {isLoading ? 'ガチャ中...' : 'ガチャを引く'}
      </button>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {monster && (
        <div className="text-center mt-4">
          <h2 className="text-lg font-bold mb-4">
            {monster.name} (レアリティ: {monster.rarity}) が当たりました！
          </h2>
          <img src={monster.imageUrl} alt={monster.name} width={200} className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default GachaPage;
