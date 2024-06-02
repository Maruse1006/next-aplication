// Slider.js
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

interface Slider {
  className: string;
}

const Slider: React.FC<Slider> = ({ className }) => {
  return (
    <div className="w-full">
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          // スライドを自動的に切り替える。
          autoplay: true,
          interval: 3000,
          type: "loop",
          // インジケーターを非表示にする。
          pagination: false,
          // 画面サイズに応じてブレイクポイントを設定。
          breakpoints: {
            640: {
              width: "100%",
              perPage: 1,
            },
            768: {
              width: "100%",
              perPage: 1,
            },
            1200: {
              width: "100%",
              perPage: 1,
            },
          },
        }}
        className="custom-splide"
      >
        <SplideSlide>
          <div>
            <img
              src="/images/dragon.png"
              alt="Dragon"
              className="w-full h-auto"
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img
              src="/images/seaMonster.png"
              alt="Sea Monster"
              className="w-full h-auto"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Slider;
