import React from "react";
import styles from "../../src/styles/LoadingAnimation.module.css";

interface LoadingSpinnerProps {
  scale: number;
  stroke: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ scale, stroke }) => {
  return (
    <div className={`${styles.wrapper} scale-[${scale}%]`}>
      <div className={styles.profileMainLoader}>
        <div className={styles.loader}>
          <svg className={styles.circularLoader} viewBox="25 25 50 50">
            <circle
              className={styles.loaderPath}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#0081C8"
              strokeWidth={`${stroke}`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
