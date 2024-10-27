import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};
const SkillForRelatedComponent: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>([]);

  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`skill/${id}`);
        setData(response.data.data.skill);
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
    <li
      key={id}
      style={{ cursor: "pointer", margin: "10px 0px" }}
      onClick={() => Navigate(`/skill/${id}`)}
    >
      {data?.attributes?.name}
    </li>
  );
};

export default SkillForRelatedComponent;
