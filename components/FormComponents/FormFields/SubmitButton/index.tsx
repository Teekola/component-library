import styles from "./submitButton.module.css";

interface Props {
   label: string;
}

export default function SubmitButton({ label }: Props) {
   return <button className={styles.button}>{label}</button>;
}
