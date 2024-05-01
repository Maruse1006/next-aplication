import React from 'react';

const PieChart = ({ data }) => {
  // セクションの色
  const colors = ['#FFC312', '#C4E538', '#12CBC4']; 
  const radius = 75; 
  //acc：累積値、item:配列から取り出した現在の要素
  let total = data.reduce((acc, item) => acc + item.value, 0);
  //開始角度を０に設定。
  let startAngle = 0;

  const calculatePath = (value, index) => {
    //円１周（２π）にセグメントが全体の中で占める割合をかけて、終了角度を出す。
    const endAngle = startAngle + (value / total) * 2 * Math.PI;
    //始点のx座標を定義
    const x0 = Math.cos(startAngle) * radius;
    //始点のy座標を定義
    const y0 = Math.sin(startAngle) * radius;
    //終点のx座標を定義
    const x1 = Math.cos(endAngle) * radius;
    //終点のy座標を定義
    const y1 = Math.sin(endAngle) * radius;
    //セグメントが半分以下の場合、小さい弧、半分以上の時は大きい弧を描く。
    const largeArcFlag = value / total > 0.5 ? 1 : 0;
    // 次のセクションの開始角度を更新
    startAngle += (value / total) * 2 * Math.PI; 
    //M（Move to） 0,0：パスの開始点をSVGの原点（円グラフの中心）に設定。
    //L (Line to) ${x0},${y0}:原点からセグメントの開始点まで直線を描く。
    //A:(Arc to) 1は円弧の方向（時計回り）${x1},${y1}:円弧の終点
    //Z:パスを閉じ、原点に戻る。
    return `M 0,0 L ${x0},${y0} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x1},${y1} Z`;
  };

  //
  const calculateTextPosition = (value, index) => {
    const angle = startAngle - (value / total) * Math.PI; // 中心角を調整
    return {
      //テキストを円の中心から少し離して配置
      // X座標を少し外側に調整
      x: Math.cos(angle) * radius * 0.6, 
      // Y座標を少し外側に調整
      y: Math.sin(angle) * radius * 0.6, 
    };
  };

  return (
    //item:data配列の現在の要素、
    <svg width="300" height="300" viewBox="-150 -150 300 300"> 
      {data.map((item, index) => {
        //セグメントの開始角度と終了角度を描くパスを描写。
        const path = calculatePath(item.value, index);
        //円グラフ上のテキストを表示するための位置を計算。
        const textPosition = calculateTextPosition(item.value, index);
        return (
          <g key={index}>
            {/*パスを描写*/}
            {/*index % colors.length： insdexをcolor配列で割った余りを出す。
            index = 0のとき、0 % 3 = 0：配列の最初の色（赤）
            index = 1のとき、1 % 3 = 1：配列の2番目の色（緑）
            index = 2のとき、2 % 3 = 2：配列の3番目の色（青）
            */}
            <path d={path} fill={colors[index % colors.length]} />
            <text
              x={textPosition.x}
              y={textPosition.y}
              fill="#fff"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="14" 
            >
              {item.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const data = [
  //セグメントの内訳を定義。
  { name: '登録STEP1', value: 1 },
  { name: '確認STEP2', value: 1 },
  { name: '完了STEP3', value: 1 },
];

const App = () => (
  <div style={{ textAlign: 'center' }}>
    <PieChart data={data} />
  </div>
);

export default App;
