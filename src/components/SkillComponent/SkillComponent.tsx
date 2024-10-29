import React, { useEffect, useState } from "react";
import styles from "./SkillComponent.module.scss";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};
const SkillComponent: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>([]);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`skill/${id}`);
        setData(response.data.data.skill);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div className={styles["related-skills"]}>
      {/* <h1>Related Skills</h1> */}
      <div
        onClick={() => Navigate(`/skill/${id}`)}
        className={styles["header"]}
      >
        {data?.attributes?.name}
      </div>

      <p>
        the ability to communicate information and ideas in speaking so others
        will understand.
      </p>
      <div className={styles["card-container"]}>
        <div className={styles["skill-card"]}>
          <span className={styles.bold}>Type:</span>
          <span> {data?.attributes?.type}</span>
        </div>
        <div className={styles["skill-card"]}>
          <span className={styles.bold}>importance:</span>
          <span> {data?.attributes?.importance}</span>
        </div>
        <div className={styles["skill-card"]}>
          <span className={styles.bold}>level:</span>
          <span> {data?.attributes?.level}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillComponent;
