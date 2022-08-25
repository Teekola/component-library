import { useFormContext } from "react-hook-form";
import styles from "./submitButton.module.css";

interface Props {
   label: string;
}

export default function SubmitButton({ label }: Props) {
   const {
      formState: { errors },
   } = useFormContext();
   return (
      <button className={styles.button} data-disabled={Object.keys(errors).length > 0}>
         {label}
      </button>
   );
}
