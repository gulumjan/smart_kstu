"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Solutions.module.scss";

// Данные решений для КГТУ
const solutions = [
  {
    id: "led",
    icon: "💡",
    title: "Умное LED-освещение",
    description: "Замена ламп на LED с датчиками движения и освещенности",
    features: [
      "Датчики движения в коридорах",
      "Датчики освещенности у окон",
      "Автоматическое расписание",
      "Снижение энергопотребления на 60%",
    ],
    stats: {
      savings: "20%",
      investment: "2.5М",
      payback: "1 год",
      co2: "400 тонн",
    },
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
  },
  {
    id: "climate",
    icon: "🌡️",
    title: "Умный климат-контроль",
    description: "Автоматическое управление отоплением и вентиляцией",
    features: [
      "Умные термостаты в аудиториях",
      "Зональное отопление",
      "Датчики присутствия",
      "Улучшенная изоляция окон",
    ],
    stats: {
      savings: "30%",
      investment: "4М",
      payback: "3 года",
      co2: "350 тонн",
    },
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
  {
    id: "solar",
    icon: "☀️",
    title: "Солнечные панели",
    description: "Возобновляемая энергия на крышах корпусов",
    features: [
      "500 кВт мощности панелей",
      "Покрытие 25% потребления",
      "Продажа излишков в сеть",
      "Система хранения энергии",
    ],
    stats: {
      savings: "25%",
      investment: "15М",
      payback: "4.8 лет",
      co2: "500 тонн",
    },
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    id: "iot",
    icon: "📊",
    title: "IoT мониторинг",
    description: "Система контроля и аналитики энергопотребления",
    features: [
      "Датчики на каждом этаже",
      "Онлайн dashboard",
      "Умные розетки",
      "SMS/Email оповещения",
    ],
    stats: {
      savings: "10%",
      investment: "1.5М",
      payback: "8 лет",
      co2: "75 тонн",
    },
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
];

// Модальный калькулятор
function Calculator({
  selectedSolutions,
  onClose,
}: {
  selectedSolutions: (typeof solutions)[0][];
  onClose: () => void;
}) {
  const baseConsumption = 5000000; // кВт⋅ч/год
  const tariff = 2.5; // сом/кВт⋅ч

  const totalSavingsPercent = selectedSolutions.reduce(
    (sum, s) => sum + parseInt(s.stats.savings),
    0
  );

  const savedKWH = (baseConsumption * totalSavingsPercent) / 100;
  const savedMoney = savedKWH * tariff;
  const totalInvestment = selectedSolutions.reduce(
    (sum, s) => sum + parseFloat(s.stats.investment.replace("М", "")) * 1000000,
    0
  );
  const paybackYears = totalInvestment / savedMoney;

  const savingsOver10Years = savedMoney * 10;
  const netProfit = savingsOver10Years - totalInvestment;

  return (
    <motion.div
      className={styles.calculatorOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.calculatorModal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className={styles.calculatorHeader}>
          <h3 className={styles.calculatorTitle}>
            🧮 Детальный расчет экономии
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Выбранные решения */}
        <div className={styles.calculatorSection}>
          <h4 className={styles.calculatorSubtitle}>
            Выбранные решения ({selectedSolutions.length})
          </h4>
          <div className={styles.selectedList}>
            {selectedSolutions.map((solution) => (
              <div key={solution.id} className={styles.selectedItem}>
                <span className={styles.selectedIcon}>{solution.icon}</span>
                <span className={styles.selectedName}>{solution.title}</span>
                <span className={styles.selectedSavings}>
                  -{solution.stats.savings}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Расчеты */}
        <div className={styles.calculatorSection}>
          <h4 className={styles.calculatorSubtitle}>📊 Годовая экономия</h4>
          <div className={styles.calcGrid}>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Снижение потребления:</div>
              <div className={styles.calcValue}>
                {totalSavingsPercent}% ({(savedKWH / 1000000).toFixed(2)}М
                кВт⋅ч)
              </div>
            </div>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Экономия денег:</div>
              <div className={styles.calcValue}>
                {(savedMoney / 1000000).toFixed(2)}М сомов/год
              </div>
            </div>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>CO₂ сокращение:</div>
              <div className={styles.calcValue}>
                {((savedKWH * 0.4) / 1000).toFixed(0)} тонн/год
              </div>
            </div>
          </div>
        </div>

        {/* Инвестиции */}
        <div className={styles.calculatorSection}>
          <h4 className={styles.calculatorSubtitle}>💰 Финансы</h4>
          <div className={styles.calcGrid}>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Общие инвестиции:</div>
              <div className={styles.calcValue}>
                {(totalInvestment / 1000000).toFixed(1)}М сомов
              </div>
            </div>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Окупаемость:</div>
              <div className={styles.calcValue}>
                {paybackYears.toFixed(1)} лет
              </div>
            </div>
          </div>
        </div>

        {/* Прогноз на 10 лет */}
        <div className={styles.calculatorHighlight}>
          <h4 className={styles.highlightTitle}>📈 Прогноз на 10 лет</h4>
          <div className={styles.highlightGrid}>
            <div className={styles.highlightItem}>
              <div className={styles.highlightLabel}>Общая экономия:</div>
              <div className={styles.highlightValue}>
                {(savingsOver10Years / 1000000).toFixed(1)}М сомов
              </div>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightLabel}>Чистая прибыль:</div>
              <div className={styles.highlightValue}>
                {(netProfit / 1000000).toFixed(1)}М сомов
              </div>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightLabel}>ROI:</div>
              <div className={styles.highlightValue}>
                {((netProfit / totalInvestment) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className={styles.calculatorActions}>
          <motion.button
            className={styles.actionButtonPrimary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📥 Скачать отчет PDF
          </motion.button>
          <motion.button
            className={styles.actionButtonSecondary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Закрыть
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Карточка решения
function SolutionCard({
  solution,
  index,
  isSelected,
  onClick,
}: {
  solution: (typeof solutions)[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Иконка */}
      <motion.div
        className={styles.icon}
        animate={{
          scale: isHovered || isSelected ? 1.2 : 1,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {solution.icon}
      </motion.div>

      {/* Заголовок */}
      <h3 className={styles.title}>{solution.title}</h3>

      {/* Описание */}
      <p className={styles.description}>{solution.description}</p>

      {/* Статистика */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statValue} style={{ color: solution.color }}>
            -{solution.stats.savings}
          </div>
          <div className={styles.statLabel}>Экономия</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{solution.stats.payback}</div>
          <div className={styles.statLabel}>Окупаемость</div>
        </div>
      </div>

      {/* Разделитель */}
      <div className={styles.divider} />

      {/* Фичи (показываются при hover или выборе) */}
      <motion.div
        className={styles.features}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isHovered || isSelected ? "auto" : 0,
          opacity: isHovered || isSelected ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <h4 className={styles.featuresTitle}>Что включает:</h4>
        <ul className={styles.featuresList}>
          {solution.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHovered || isSelected ? 1 : 0,
                x: isHovered || isSelected ? 0 : -10,
              }}
              transition={{ delay: i * 0.05 }}
            >
              ✓ {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Детали */}
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Инвестиции:</span>
          <span className={styles.detailValue}>
            {solution.stats.investment} сом
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>CO₂:</span>
          <span className={styles.detailValue}>-{solution.stats.co2}/год</span>
        </div>
      </div>

      {/* Кнопка */}
      <motion.button
        className={styles.button}
        style={{ background: solution.gradient }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSelected ? "✓ Выбрано" : "Подробнее"}
      </motion.button>

      {/* Фоновый градиент */}
      {(isHovered || isSelected) && (
        <motion.div
          className={styles.bgGradient}
          style={{ background: solution.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Главный компонент
export default function Solutions() {
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);

  const toggleSolution = (id: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Подсчет общей экономии
  const calculateTotal = () => {
    const selected = solutions.filter((s) => selectedSolutions.includes(s.id));
    const totalSavings = selected.reduce(
      (sum, s) => sum + parseInt(s.stats.savings),
      0
    );
    const totalInvestment = selected.reduce(
      (sum, s) => sum + parseFloat(s.stats.investment.replace("М", "")),
      0
    );
    const totalCO2 = selected.reduce(
      (sum, s) => sum + parseInt(s.stats.co2.split(" ")[0]),
      0
    );

    return { totalSavings, totalInvestment, totalCO2 };
  };

  const { totalSavings, totalInvestment, totalCO2 } = calculateTotal();

  return (
    <section className={styles.solutions}>
      {/* Заголовок секции */}
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>💡 Решения для умного КГТУ</h2>
          <p className={styles.sectionSubtitle}>
            Выберите решения и посмотрите суммарную экономию
          </p>
        </motion.div>
      </div>

      {/* Сетка карточек */}
      <div className={styles.grid}>
        {solutions.map((solution, index) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            index={index}
            isSelected={selectedSolutions.includes(solution.id)}
            onClick={() => toggleSolution(solution.id)}
          />
        ))}
      </div>

      {/* Панель итогов */}
      {selectedSolutions.length > 0 && (
        <motion.div
          className={styles.summary}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.summaryContent}>
            <div className={styles.summaryTitle}>
              📊 Итоговая экономия ({selectedSolutions.length}{" "}
              {selectedSolutions.length === 1
                ? "решение"
                : selectedSolutions.length < 5
                ? "решения"
                : "решений"}
              )
            </div>

            <div className={styles.summaryStats}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryValue}>{totalSavings}%</div>
                <div className={styles.summaryLabel}>Общая экономия</div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryItem}>
                <div className={styles.summaryValue}>
                  {totalInvestment.toFixed(1)}М
                </div>
                <div className={styles.summaryLabel}>Инвестиции</div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryItem}>
                <div className={styles.summaryValue}>{totalCO2}</div>
                <div className={styles.summaryLabel}>тонн CO₂/год</div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryItem}>
                <div className={styles.summaryValue}>
                  {((5000000 * totalSavings) / 100 / 1000000).toFixed(1)}М
                </div>
                <div className={styles.summaryLabel}>кВт⋅ч/год</div>
              </div>
            </div>

            <motion.button
              className={styles.summaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalculator(true)}
            >
              Рассчитать детально →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Призыв к действию */}
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className={styles.ctaTitle}>
          Готовы сделать КГТУ энергоэффективным?
        </h3>
        <p className={styles.ctaText}>
          Начните с бесплатного энергоаудита и узнайте точный потенциал экономии
        </p>
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Заказать аудит
        </motion.button>
      </motion.div>

      {/* Модальное окно калькулятора */}
      {showCalculator && (
        <Calculator
          selectedSolutions={selectedSolutions.map(
            (id) => solutions.find((s) => s.id === id)!
          )}
          onClose={() => setShowCalculator(false)}
        />
      )}
    </section>
  );
}
