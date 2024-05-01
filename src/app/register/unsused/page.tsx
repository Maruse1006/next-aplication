import fs from 'fs';
import path from 'path';

const Confirm = ({ content }) => {
  // コンポーネントのコード
};

export async function getServerSideProps() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'example.txt');
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      props: {
        content
      }
    };
  } catch (error) {
    console.error("ファイルの読み込みエラー:", error);
    return {
      props: {
        content: null
      }
    };
  }
}

export default Confirm;
