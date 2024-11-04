import { getDataFetch } from "../api/Fetch/route"; 

export default async function Home() {
 
  const datas = await getDataFetch();
  console.log(datas);

  return (
    <main>
      <ul>
        {datas.map((data) => (
          <li key={data.id}>
             <h2>{data.id}</h2>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <small>投稿日: {data.createdAt}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
