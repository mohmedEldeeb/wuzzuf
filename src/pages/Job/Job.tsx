import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Job.module.scss";
import { useParams } from "react-router-dom";
import SkillComponent from "../../components/SkillComponent/SkillComponent";
import JobForRelatedComponent from "../../components/jobForRelatedComponent/JobForRelatedComponent";
const Job: React.FC = () => {
  const [job, setJob] = useState<any>([]);
  const [relatedJobs, setRelatedJobs] = useState<any>([]);
  const { uuid } = useParams();

  const fetchSkills = async (s: {}[]) => {
    try {
      const responses = await Promise.all(
        s.map((id: any) => api.get(`skill/${id.id}`))
      );
      const skillsData = await Promise.all(
        responses.map((res) => res.data.data.skill.relationships.jobs)
      );

      setRelatedJobs([
        ...new Set(skillsData.flat().map((item: any) => item.id)),
      ]);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`job/${uuid}`);
        setJob(response.data.data.job);
        fetchSkills(response.data.data.job?.relationships?.skills);
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
            Job Title:{job?.attributes?.title}
          </div>
        </div>
        <div className={styles["job-description"]}>
          <p>Job Description</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            tempore in soluta dignissimos aperiam unde quia sequi, tenetur nisi
            a aspernatur minus non. Debitis, inventore. Dolorem dolore incidunt
            omnis numquam!
          </p>
        </div>
        <h3>Related Skills</h3>

        {job &&
          job?.relationships?.skills?.map((skill: any) => (
            <SkillComponent id={skill?.id} />
          ))}
      </div>
      <div className={styles["job-related-skills"]}>
        <h3>Related Skills</h3>
        <ul>
          {relatedJobs?.map((job: any) => (
            <li key={job?.id}>
              <JobForRelatedComponent id={job} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Job;
