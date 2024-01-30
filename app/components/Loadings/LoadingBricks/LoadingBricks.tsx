import React, { HTMLAttributes } from "react";
import styles from "./loading.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

function LoadingBricks({ className, ...props }: Props) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div className="styles.box-wrap">
                <div className={`${styles.box} ${styles.one}`}></div>
                <div className={`${styles.box} ${styles.two}`}></div>
                <div className={`${styles.box} ${styles.three}`}></div>
                <div className={`${styles.box} ${styles.four}`}></div>
                <div className={`${styles.box} ${styles.five}`}></div>
                <div className={`${styles.box} ${styles.six}`}></div>
            </div>
        </div>
    );
}

export default LoadingBricks;
