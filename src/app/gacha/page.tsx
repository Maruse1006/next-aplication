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
    <div>
      <h1>モンスターガチャ</h1>
      <button onClick={pullGacha} disabled={isLoading}>
        {isLoading ? 'ガチャ中...' : 'ガチャを引く'}
      </button>

      {errorMessage && <p>{errorMessage}</p>}

      {monster && (
        <div>
          <h2>{monster.name} (レアリティ: {monster.rarity}) が当たりました！</h2>
          <img src={monster.imageUrl} alt={monster.name} width={200} />
        </div>
      )}
    </div>
  );
};

export default GachaPage;
