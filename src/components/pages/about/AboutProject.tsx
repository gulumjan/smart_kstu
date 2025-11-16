import React from "react";
import scss from "./AboutProject.module.scss";
import { FiMonitor, FiZap, FiUsers, FiTrendingUp } from "react-icons/fi";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  color: string;
}

const AboutProject: React.FC = () => {
  const features: Feature[] = [
    {
      icon: FiMonitor,
      title: "Реальные дашборды",
      description:
        "Графики в реальном времени, история и сравнения по корпусам.",
    },
    {
      icon: FiZap,
      title: "Аналитика энергозатрат",
      description:
        "Мы показываем, где можно экономить — и сколько это даст денег.",
    },
    {
      icon: FiUsers,
      title: "Команда 5 человек",
      description:
        "Каждый отвечает за свою часть: датчики, API, визуализации, UX и стили.",
    },
    {
      icon: FiTrendingUp,
      title: "Цель — эффект",
      description:
        "Сократить расходы и сделать кампус экологичнее и технологичнее.",
    },
  ];

  const metrics: Metric[] = [
    { value: "+18%", label: "Экономия (целевой)" },
    { value: "4 корпуса", label: "Подключены" },
    { value: "5 чел.", label: "Команда" },
  ];

  const team: TeamMember[] = [
    { name: "Закирова Гулумжан", role: "Backend & API", color: "#4cc9f0" },
    { name: "Мадылбекова Бегимай", role: "Data Analysis", color: "#f72585" },
    { name: "Мырзабекова Айзирек", role: "Frontend & UX", color: "#7209b7" },
    { name: "Мустафаева Алтынай", role: "IoT & Sensors", color: "#3a0ca3" },
    { name: "Шумкарова Мерседе", role: "Design & UI", color: "#4361ee" },
  ];

  return (
    <section className={scss.AboutProject} id="about">
      <div className="container">
        <div className={scss.card}>
          {/* Header */}
          <header className={scss.header}>
            <div className={scss.badge}>О проекте</div>
            <h2 className={scss.title}>
              Умное управление энергией <span>SMART KSTU</span>
            </h2>
            <p className={scss.lead}>
              Мы — команда из 5 человек. Делаем визуализацию энергопотребления
              кампуса и реальные инструменты для экономии энергии.
            </p>
          </header>

          {/* Features grid */}
          <div className={scss.grid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={index}
                  className={scss.item}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={scss.iconWrap}>
                    <Icon />
                    <div className={scss.iconGlow} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className={scss.itemShine} />
                </article>
              );
            })}
          </div>

          {/* Team Section */}
          <div className={scss.teamSection}>
            <h3 className={scss.teamTitle}>
              <FiUsers />
              Наша команда
            </h3>
            <div className={scss.teamGrid}>
              {team.map((member, index) => (
                <div
                  key={index}
                  className={scss.teamCard}
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div
                    className={scss.avatar}
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)`,
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className={scss.memberInfo}>
                    <h4>{member.name}</h4>
                  </div>
                  <div
                    className={scss.colorAccent}
                    style={{ background: member.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className={scss.metrics}>
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={scss.metric}
                style={{ animationDelay: `${(index + 9) * 100}ms` }}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
        </div>

        {/* Background decorations */}
        <div className={scss.bgDecor}>
          <div className={scss.blob1} />
          <div className={scss.blob2} />
          <div className={scss.blob3} />
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
