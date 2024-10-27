import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import SearchHistory from "../../components/SearchHistory/SearchHistory";
import styles from "./Search.module.scss";
import api from "../../services/api";

const Search = () => {
  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    if (jobs?.length > 0) return;
    const fetchJobs = async () => {
      const response = await api.get(`jobs`);
      setJobs(response.data.data.jobs);
    };
    fetchJobs();
  }, []);
  return (
    <div className={styles["search-page"]}>
      <h1>Search</h1>
      <SearchComponent isSearching setJobs={setJobs} />

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
        </div>
        <div className={styles["search-history"]}>
          <SearchHistory />
        </div>
      </div>
    </div>
  );
};

export default Search;
