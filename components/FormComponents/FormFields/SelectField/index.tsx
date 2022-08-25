import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./selectField.module.css";

// Require name and label, accept all HTML input field's attributes
interface InputFieldProps extends ComponentProps<"select"> {
   name: string;
   label: string;
   options: string[];
   required?: boolean;
}

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidSelectStyle = `${styles.select} ${styles.invalid}`;
const requiredLabelStyle = `${styles.label} ${styles.required}`;

const SelectField = ({ name, label, options, required, ...rest }: InputFieldProps) => {
   // Get react-hook-form methods from the form context
   const {
      register,
      formState: { errors },
   } = useFormContext();
   // Handle Attributes
   const id = rest.id ? rest.id : name;
   const isInvalid = !!errors[name];
   const selectClassName = isInvalid ? invalidSelectStyle : styles.select;
   const labelClassName = required ? requiredLabelStyle : styles.label;
   return (
      <div className={styles.container}>
         <label className={labelClassName} htmlFor={id}>
            {label}
         </label>
         <select className={selectClassName} id={id} aria-invalid={isInvalid} {...register(name)} {...rest}>
            {options.map((option) => (
               <option className={styles.option} key={option} value={option}>
                  {option}
               </option>
            ))}
         </select>
         <ErrorMessage errors={errors} name={name} render={renderError} />
      </div>
   );
};
export default SelectField;
