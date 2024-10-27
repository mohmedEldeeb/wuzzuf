import React, { useEffect, useState } from "react";
import styles from "./Skill.module.scss";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import JobComponent from "../../components/JobComponent/JobComponent";
import SkillForRelatedComponent from "../../components/SkillForRelatedComponent/SkillForRelatedComponent";
const Skill: React.FC = () => {
  const [skill, setSkill] = useState<any>([]);
  const { uuid } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`skill/${uuid}`);
        setSkill(response.data.data.skill);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (uuid) {
      fetchJob();
    }
  }, [uuid]);

  return (
    <div className={styles["job-page"]}>
      <div className={styles["job-container"]}>
        <div className={styles["job-header"]}>
          <div className={styles["job-title"]}>
            Skill Title: {skill?.attributes?.name}
          </div>
        </div>
        <div className={styles["job-description"]}>
          <p> Description</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            tempore in soluta dignissimos aperiam unde quia sequi, tenetur nisi
            a aspernatur minus non. Debitis, inventore. Dolorem dolore incidunt
            omnis numquam!
          </p>
        </div>

        {skill?.relationships?.jobs?.map((skill: any) => (
          <JobComponent id={skill?.id} />
        ))}
      </div>
      <div className={styles["job-related-skills"]}>
        <h3>Related Skills</h3>
        <ul>
          {skill?.relationships?.skills?.map((skill: any) => (
            <SkillForRelatedComponent id={skill?.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skill;
