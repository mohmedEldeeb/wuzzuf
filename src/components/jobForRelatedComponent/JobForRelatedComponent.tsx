import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

type Props = {
  id: string;
};
const JobForRelatedComponent: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>([]);

  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`job/${id}`);
        setData(response.data.data.job);
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
      onClick={() => Navigate(`/job/${id}`)}
    >
      {data?.attributes?.title}
    </li>
  );
};

export default JobForRelatedComponent;
