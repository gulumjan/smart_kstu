import { FC } from "react";
import scss from "./ImpactPage.module.scss";
import CoworkingZone from "../coworking/CoworkingZone";

const ImpactPage: FC = () => {
  return (
    <section className={scss.ImpactPage}>
      <div className="container">
        <div className={scss.content}>
          ImpactPage
          <CoworkingZone />
        </div>
      </div>
    </section>
  );
};

export default ImpactPage;
