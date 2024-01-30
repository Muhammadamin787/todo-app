/** @format */
import React from "react";
import styles from "./loading.module.scss";

function LoadingBalls({ isBlack }: { isBlack?: boolean }) {
    return <span className={`${styles.loader} ${isBlack ? styles.black : ""}`}></span>;
}

export default LoadingBalls;
