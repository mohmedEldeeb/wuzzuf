import React, { useState, useEffect } from "react";
import styles from "./LoadingBar.module.scss";

const LoadingBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-bar"]} style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};

export default LoadingBar;
