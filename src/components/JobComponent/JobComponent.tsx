import React, { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./JobComponent.module.scss";
import { useNavigate } from "react-router-dom";
type Props = {
  id: string;
};
const JobComponent: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>([]);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`job/${id}`);
        setData(response.data.data.job);
        console.log(response);
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
      <div className={styles["header"]} onClick={() => Navigate(`/job/${id}`)}>
        {data?.attributes?.title}
      </div>

      <div className={styles["card-container"]}>
        <div className={styles["skill-card"]}>
          <span className={styles.bold}>importance:</span>
          <span> 3.7</span>
        </div>
        <div className={styles["skill-card"]}>
          <span className={styles.bold}>level:</span>
          <span> 2.3</span>
        </div>
      </div>
    </div>
  );
};

export default JobComponent;
