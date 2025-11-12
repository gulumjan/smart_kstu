"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./Feedback.module.scss";
import axios from "axios";
import { IoCall, IoMailUnreadOutline } from "react-icons/io5";

interface ITelegramSmsBot {
  message: string;
}

const Feedback = () => {
  const { register, handleSubmit, reset } = useForm<ITelegramSmsBot>();
  const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  const messageModel = (data: ITelegramSmsBot) => {
    return `✉️ Новое сообщение с сайта Smart KSTU:\n\n${data.message}`;
  };

  const onSubmit: SubmitHandler<ITelegramSmsBot> = async (data) => {
    try {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: messageModel(data),
      });
     
      reset();
   
    } catch (error) {
      console.error("Telegram send error:", error);
     
    }
  };

  return (
    <section className={scss.feedback}>
      <div className={scss.container}>
        <div className={scss.header}>
          <h1>Свяжитесь с нами</h1>
          <p>
            Smart KSTU — расскажите о проблеме или оставьте отзыв. Мы ответим в
            ближайшее время.
          </p>
        </div>

        <div className={scss.content}>
          <div className={scss.infoBlock}>
            <div className={scss.card}>
              <div className={scss.cardTop}>
                <IoCall className={scss.icon} />
                <h3>Позвоните нам</h3>
              </div>
              <p className={scss.cardText}>
                Мы на связи 24/7 — звоните по любым вопросам.
              </p>
              <span className={scss.cardAccent}>
                Телефон: +996 (700) 123-456
              </span>
            </div>

            <div className={scss.card}>
              <div className={scss.cardTop}>
                <IoMailUnreadOutline className={scss.icon} />
                <h3>Напишите нам</h3>
              </div>
              <p className={scss.cardText}>
                Оставьте сообщение — отвечаем обычно в течение 24 часов.
              </p>
              <span className={scss.cardAccent}>support@smartkstu.kg</span>
            </div>
          </div>

          <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={scss.label}>Ваше сообщение</label>
            <textarea
              {...register("message", { required: true })}
              placeholder="Опишите проблему, предложение или отзыв..."
              className={scss.textarea}
            />
            <div className={scss.formControls}>
              <button type="submit" className={scss.btnPrimary}>
                Отправить сообщение
              </button>
              <button
                type="button"
                className={scss.btnGhost}
                onClick={() => {
                  reset();
                }}
              >
                Очистить
              </button>
            </div>
            <p className={scss.hint}>
              Сообщение будет отправлено в наш Telegram-канал поддержки.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
