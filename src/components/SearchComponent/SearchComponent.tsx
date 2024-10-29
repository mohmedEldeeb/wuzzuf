import React, { useState, ChangeEvent, useCallback, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchComponent.module.scss";
import { debounce } from "lodash";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addSearchTerm } from "../../store/slices/searchHistorySlices";

type Props = {
  isSearching?: boolean;
  setJobs?: any;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SearchComponent: React.FC<Props> = ({
  isSearching,
  setJobs,
  setLoading,
}) => {
  const queryx = useQuery();

  const [query, setQuery] = useState<string>(queryx.get("query") || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
    }
  }, [query]);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setLoading!(true);
      api.get(`jobs/search?query=${searchTerm}`).then((response) => {
        setJobs(response.data.data.jobs);

        let suggestions = response.data.data.jobs.map(
          (item: any) => item.attributes.title
        );
        setSuggestions(suggestions);
      });

      setLoading!(false);
    }, 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (isSearching) {
      navigate(`/jobs/search?query=${value}`, { state: { query: value } });
    }
    if (value.length > 2) {
      navigate(`/jobs/search?query=${value}`, { replace: true });
      setLoading!(true);
      debouncedSearch(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(addSearchTerm(suggestion));
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={styles["search-component"]}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <FaSearch className={styles.icon} />
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
