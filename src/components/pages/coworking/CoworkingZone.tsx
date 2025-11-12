"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./CoworkingZone.module.scss";

export default function CoworkingZone() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isInView]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    setShowOverlay(false);
    handlePlayPause();
  };

  const problems = [
    {
      icon: "⚡",
      title: "Высокое потребление",
      value: "5М кВт⋅ч",
      description: "электроэнергии ежегодно",
      color: "#ef4444",
    },
    {
      icon: "💰",
      title: "Большие расходы",
      value: "12.5М",
      description: "сомов на электричество",
      color: "#f59e0b",
    },
    {
      icon: "🌡️",
      title: "Устаревшая система",
      value: "80%",
      description: "оборудования требует замены",
      color: "#3b82f6",
    },
    {
      icon: "🌍",
      title: "CO₂ выбросы",
      value: "2000т",
      description: "углекислого газа в год",
      color: "#10b981",
    },
  ];

  return (
    <section className={styles.coworkingZone} ref={sectionRef}>
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>⚠️ Проблема энергоэффективности КГТУ</h2>
          <p className={styles.subtitle}>
            Коворкинг-зоны и учебные корпуса потребляют огромное количество
            энергии
          </p>
        </motion.div>
      </div>

      <div className={styles.videoContainer}>
        <motion.div
          className={styles.videoWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <video
            ref={videoRef}
            className={styles.video}
            loop
            muted
            playsInline
            onClick={handleVideoClick}
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>

          {showOverlay && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 1 }}
              animate={{ opacity: showOverlay ? 1 : 0 }}
              onClick={handleVideoClick}
            >
              <div className={styles.overlayContent}>
                <motion.div
                  className={styles.playButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle
                      cx="40"
                      cy="40"
                      r="38"
                      stroke="white"
                      strokeWidth="3"
                      opacity="0.5"
                    />
                    <circle cx="40" cy="40" r="40" fill="white" />
                    <path d="M32 26L56 40L32 54V26Z" fill="#3b82f6" />
                  </svg>
                </motion.div>
                <h3 className={styles.overlayTitle}>
                  Посмотрите видео о коворкинг-зонах КГТУ
                </h3>
                <p className={styles.overlayText}>
                  Узнайте, как мы можем сэкономить энергию
                </p>
              </div>
            </motion.div>
          )}

          {!showOverlay && (
            <motion.button
              className={styles.controlButton}
              onClick={handlePlayPause}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              {isPlaying ? "⏸" : "▶"}
            </motion.button>
          )}

          <div className={styles.videoFrame} />
        </motion.div>

        <motion.div
          className={styles.floatingElement}
          style={{ top: "10%", left: "5%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💡
        </motion.div>
        <motion.div
          className={styles.floatingElement}
          style={{ top: "60%", right: "8%" }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          ⚡
        </motion.div>
        <motion.div
          className={styles.floatingElement}
          style={{ bottom: "15%", left: "10%" }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🌡️
        </motion.div>
      </div>

      <div className={styles.problemsGrid}>
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            className={styles.problemCard}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div
              className={styles.problemIcon}
              style={{ background: problem.color }}
            >
              {problem.icon}
            </div>
            <div className={styles.problemContent}>
              <h4 className={styles.problemTitle}>{problem.title}</h4>
              <div
                className={styles.problemValue}
                style={{ color: problem.color }}
              >
                {problem.value}
              </div>
              <p className={styles.problemDescription}>{problem.description}</p>
            </div>

            <motion.div
              className={styles.problemBorder}
              style={{ background: problem.color }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>Мы можем изменить это! 💚</h3>
          <p className={styles.ctaText}>
            С помощью умных решений КГТУ может сократить потребление энергии на
            <strong> 45-85%</strong> и сэкономить{" "}
            <strong>миллионы сомов</strong> ежегодно
          </p>
          <div className={styles.ctaButtons}>
            <motion.button
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Смотреть решения ↓
            </motion.button>
            <motion.button
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Узнать больше →
            </motion.button>
          </div>
        </div>

        <div className={styles.ctaDecoration}>
          <motion.div
            className={styles.ctaCircle}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={styles.ctaCircle}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
      </motion.div>

      <div className={styles.backgroundGradient} />
    </section>
  );
}
