import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

/**
 * Card component that displays a header and a list of related skills.
 * The header uses styles defined in Card.scss.
 * Skills displayed example are HTML, CSS, JS, React, Next, and Tailwind.
 */

type CardProps = {
  title: string;
  skillIds: any;
  key?: string;
  id?: string;
};

const Card: React.FC<CardProps> = ({
  title = "Job Title",
  skillIds,
  id,
}: CardProps) => {
  const [skills, setSkills] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const responses = await Promise.all(
          skillIds.map((id: any) => api.get(`skill/${id.id}`))
        );
        const skillsData = await Promise.all(
          responses.map((res) => res.data.data.skill.attributes)
        );

        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, [skillIds]);

  return (
    <div key={id} className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.subtitle}>related skils</span>
      <div className={styles.skills}>
        {skills.map((skill: any, index: number) => (
          <div
            key={skillIds?.[index]?.id}
            onClick={() => {
              navigate(`/skill/${skillIds[index]?.id}`);
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(`/job/${id}`)} className={styles.button}>
        view job details
      </button>
    </div>
  );
};

export default Card;
