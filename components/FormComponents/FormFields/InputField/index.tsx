import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./inputField.module.css";

// Require name and label, accept all HTML input field's attributes
interface InputFieldProps extends ComponentProps<"input"> {
   name: string;
   label: string;
   required?: boolean;
}

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidInputStyle = `${styles.input} ${styles.invalid}`;
const requiredLabelStyle = `${styles.label} ${styles.required}`;

const InputField = ({ name, label, required, ...rest }: InputFieldProps) => {
   // Get react-hook-form methods from the form context
   const {
      register,
      formState: { errors },
   } = useFormContext();
   // Handle Attributes
   const id = rest.id ? rest.id : name;
   const isInvalid = !!errors[name];
   const labelClassName = required ? requiredLabelStyle : styles.label;
   const inputClassName = isInvalid ? invalidInputStyle : styles.input;
   return (
      <div className={styles.container}>
         <label className={labelClassName} htmlFor={id}>
            {label}
         </label>
         <input className={inputClassName} id={id} aria-invalid={isInvalid} {...register(name)} {...rest} />
         <ErrorMessage errors={errors} name={name} render={renderError} />
      </div>
   );
};
export default InputField;
