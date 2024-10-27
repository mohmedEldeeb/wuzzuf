import Card from "../../components/Card/Card";
import styles from "./Home.module.scss";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, fetchItemsNext } from "../../store/slices/jobSlices";
import { AppDispatch, RootState } from "../../store/store";
import LoadingBar from "../../layouts/LoadingBar/LoadingBar";
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);
  const status = useSelector((state: RootState) => state.items.status);

  useEffect(() => {
    if (items.jobs.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingBar />;
  }
  if (status === "failed") {
    return <div>failed</div>;
  }
  return (
    <div>
      <div>Home</div>
      <SearchComponent />
      <div className={styles["card-container"]}>
        {items?.jobs?.length > 0 &&
          items?.jobs.map(
            (item: { id: string; attributes: any; relationships: any }) => (
              <Card
                id={item?.id}
                title={item?.attributes.title}
                skillIds={item?.relationships.skills}
              />
            )
          )}
      </div>
      {items?.jobs?.length === 0 && <div>No data found</div>}
      <div style={{ height: "50px" }}>
        {status === "lodingMore" && <LoadingBar />}
      </div>
      <button onClick={() => dispatch(fetchItemsNext())}>Load more</button>
      <div className={styles["jobs-component"]}>
        {status !== "lodingMore" &&
          items?.meta?.next &&
          items.jobs.length > 0 && (
            <div className="loader">
              <button onClick={() => dispatch(fetchItemsNext())}>
                Load More
              </button>
            </div>
          )}
        {!items?.meta?.next && <p className="end-message">No more results</p>}
      </div>
    </div>
  );
};

export default Home;
