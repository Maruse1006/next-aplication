## モンスターのガチャ実装
ガチャを引くと、モンスターを手に入れることができる。
モンスターはレア度があり、それに応じたガチャの排出率が決まっている。

## seeder作成について
①コンテナの中に入る。
```
docker exec -it next-aplication-app-1 /bin/sh
```
②
```
npx prisma db seed
```

![image](https://github.com/user-attachments/assets/48addfd2-451e-4274-9121-6889ce655671)

## tailwindcssについて
**配置：タイトルとボタンを中央揃えにして、余白をもたせたい**
・最初の画面の配置
![image](https://github.com/user-attachments/assets/65f8d634-3bf7-43c7-9f4c-a99f1712e15b)
```
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
    <div className="flex flex-col items-center p-8">
      <h1 className="text-center mb-4 text-xl font-semibold">モンスターガチャ</h1>
      
      <button
        onClick={pullGacha}
        disabled={isLoading}
        className="mb-6 bg-red-500 hover:bg-red-700 rounded-lg text-white font-bold py-2 px-6 sm:px-8 lg:w-2/5  focus:ring-2"
      >
        {isLoading ? 'ガチャ中...' : 'ガチャを引く'}
      </button>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {monster && (
        <div className="text-center mt-6">
          <h2 className="text-lg font-bold mb-2">
            {monster.name} (レアリティ: {monster.rarity}) が当たりました！
          </h2>
          <img src={monster.imageUrl} alt={monster.name} width={200} className="mx-auto mb-4" />
        </div>
      )}
    </div>
  );
};

export default GachaPage;

```
・変更後の画面の配置
![image](https://github.com/user-attachments/assets/31b8dba0-2174-4d71-b65d-6ba2ee3ab147)
**変更点**
```
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 gap-8">
      <h1 className="text-center text-2xl font-semibold mb-4">モンスターガチャ</h1>
```
・一番外側のクラスにjustify-center min-h-screenを追加


## ER図
![image](https://github.com/user-attachments/assets/80c5c93f-5a48-498b-880b-5d0f9cc88916)

