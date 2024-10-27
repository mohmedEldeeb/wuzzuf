import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const SearchHistory: React.FC = () => {
  const { searchHistory } = useSelector((state: RootState) => state);
  return (
    <div>
      <h1>Search History</h1>
      <ul>
        {searchHistory.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
