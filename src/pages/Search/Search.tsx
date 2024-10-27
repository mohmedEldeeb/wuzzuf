import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import SearchHistory from "../../components/SearchHistory/SearchHistory";
import styles from "./Search.module.scss";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import LoadingBar from "../../layouts/LoadingBar/LoadingBar";

const Search = () => {
  const [jobs, setJobs] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setError(null);
        const response = await api.get(`jobs`);
        setJobs(response.data.data.jobs);
      } catch (error: any) {
        setError(error?.message);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className={styles["search-page"]}>
      <h1>Search</h1>
      <SearchComponent isSearching setJobs={setJobs} setLoading={setLoading} />
      <div style={{ height: "50px", width: "100%" }}>
        {loading && <LoadingBar />}
      </div>
      <div className={styles["container"]}>
        <div className={styles["card-container"]}>
          {jobs?.length > 0 &&
            jobs?.map(
              (item: { id: string; attributes: any; relationships: any }) => (
                <Card
                  id={item?.id}
                  title={item?.attributes.title}
                  skillIds={item?.relationships.skills}
                />
              )
            )}

          {jobs?.length === 0 && <p>No results found</p>}

          {error && <p>Error: {error}</p>}
        </div>
        <div className={styles["search-history"]}>
          <SearchHistory />
        </div>
      </div>
    </div>
  );
};

export default Search;
