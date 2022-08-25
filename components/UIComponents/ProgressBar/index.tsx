import styles from "./progressBar.module.css";

type Props = {
   value: number;
   label: string;
};
const ProgressBar = ({ value, label }: Props) => (
   <div className={styles.container}>
      <label className={styles.label} htmlFor="uploadProgress">
         {label}
      </label>
      <div className={styles.progressContainer}>
         <div className={styles.progress}>
            <progress className={styles.noDisplay} id="uploadProgress" value={value} max="100"></progress>
            <div className={styles.bar} style={{ width: value + "%" }}></div>
         </div>
         <span className={styles.value}>{value} %</span>
      </div>
   </div>
);

export default ProgressBar;
