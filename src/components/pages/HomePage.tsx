import { FC } from "react";
import scss from "./HomePage.module.scss";
import Campus3D from "./3d/Campus3d";

const HomePage: FC = () => {
  return (
    <section className={scss.HomePage}>
      <div className="container">
        <div className={scss.content}>
          <Campus3D />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
