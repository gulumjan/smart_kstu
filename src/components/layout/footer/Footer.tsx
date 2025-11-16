import { FC } from "react";
import scss from "./Footer.module.scss";
import { FiGithub, FiMail } from "react-icons/fi";

const Footer: FC = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.contacts}>
            <a href="mailto:team@smartkstu.kg" className={scss.contactLink}>
              <FiMail />
            </a>

            <a
              href="https://github.com/gulumjan/smart_kstu"
              target="_blank"
              rel="noopener noreferrer"
              className={scss.contactLink}
            >
              <FiGithub />
            </a>
          </div>

          <p className={scss.copyright}>
            © {new Date().getFullYear()} SMART KSTU. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
