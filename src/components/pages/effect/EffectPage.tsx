"use client";
import { FC, useState } from "react";
import scss from "./EffectPage.module.scss";
import beforeImg from "../../../../public/images/before.png";
import afterImg from "../../../../public/images/after.png";

const EffectPage: FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  console.log(beforeImg, "before");

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className={scss.EffectPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.header}>
            <h1>Эффект от внедрения</h1>
            <p>Визуализация энергоэффективных решений в КГТУ</p>
          </div>

          <div className={scss.comparisonSection}>
            <h2>5-й корпус: Главный вход</h2>
            <p className={scss.subtitle}>
              Современное светодиодное освещение и оптимизация дизайна
            </p>

            <div className={scss.imageComparison}>
              <div className={scss.comparisonContainer}>
                <div className={scss.imageWrapper}>
                  {/* Фото ДО */}
                  <img
                    src={`${beforeImg.src}`}
                    alt="До внедрения"
                    className={scss.imageBefore}
                  />

                  {/* Фото ПОСЛЕ */}
                  <div
                    className={scss.imageAfter}
                    style={{
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                  >
                    <img src={`${afterImg.src}`} alt="После внедрения" />
                  </div>

                  {/* Слайдер */}
                  <div
                    className={scss.slider}
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className={scss.sliderButton}>
                      <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="15" fill="white" />
                        <path d="M10 15L7 12V18L10 15Z" fill="#2563eb" />
                        <path d="M20 15L23 12V18L20 15Z" fill="#2563eb" />
                      </svg>
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className={scss.sliderInput}
                />
              </div>

              <div className={scss.labels}>
                <div className={scss.labelBefore}>
                  <span className={scss.badge}>ДО</span>
                  <p>Стандартное освещение</p>
                </div>
                <div className={scss.labelAfter}>
                  <span className={scss.badge}>ПОСЛЕ</span>
                  <p>LED-освещение + дизайн</p>
                </div>
              </div>
            </div>

            <div className={scss.improvements}>
              <h3>Ключевые улучшения:</h3>
              <div className={scss.improvementGrid}>
                <div className={scss.improvementCard}>
                  <div className={scss.icon}>💡</div>
                  <h4>Энергопотребление</h4>
                  <p className={scss.value}>-60%</p>
                  <p>Снижение потребления электроэнергии</p>
                </div>
                <div className={scss.improvementCard}>
                  <div className={scss.icon}>🌟</div>
                  <h4>Освещенность</h4>
                  <p className={scss.value}>+40%</p>
                  <p>Улучшение качества света</p>
                </div>
                <div className={scss.improvementCard}>
                  <div className={scss.icon}>♻️</div>
                  <h4>CO₂</h4>
                  <p className={scss.value}>-2.5т/год</p>
                  <p>Сокращение выбросов</p>
                </div>
                <div className={scss.improvementCard}>
                  <div className={scss.icon}>💰</div>
                  <h4>Экономия</h4>
                  <p className={scss.value}>₸450k/год</p>
                  <p>Снижение затрат на электричество</p>
                </div>
              </div>
            </div>

            <div className={scss.note}>
              <p>
                <strong>Примечание:</strong> Аналогичные улучшения планируются
                для остальных зон 5-го корпуса и других корпусов университета.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EffectPage;
