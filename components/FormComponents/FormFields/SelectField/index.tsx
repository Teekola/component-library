import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./selectField.module.css";

// Require name and label, accept all HTML input field's attributes
interface InputFieldProps extends ComponentProps<"select"> {
   name: string;
   label: string;
   options: string[];
   showModified?: boolean;
}

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidSelectStyle = `${styles.select} ${styles.invalid}`;
const modifiedSelectStyle = `${styles.select} ${styles.modified}`;

const SelectField = ({ name, label, options, showModified, ...rest }: InputFieldProps) => {
   // Get react-hook-form methods from the form context
   const {
      register,
      formState: { errors, dirtyFields },
   } = useFormContext();
   // Handle Attributes
   const id = rest.id ? rest.id : name;
   const isInvalid = !!errors[name];
   const isModified = showModified && !!dirtyFields[name];
   const selectClassName = isInvalid ? invalidSelectStyle : isModified ? modifiedSelectStyle : styles.select;
   return (
      <div className={styles.container}>
         <label className={styles.label} htmlFor={id}>
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
