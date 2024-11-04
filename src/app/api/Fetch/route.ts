import { Data } from "../../types"; 

export const getDataFetch = async (): Promise<Data[]> => {
    const res = await fetch(`http://localhost:3001/posts`, { cache: "no-store" }); //SSR 
    // SSGの場合は { cache: 'force-cache'｝
    
    if (!res.ok) {
      throw new Error("エラーが発生しました。");
    }
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const data = await res.json();
    
    return data;
  };
  