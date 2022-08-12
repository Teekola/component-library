import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./checkbox.module.css";

// Require name and label, accept all HTML input field's attributes
interface CheckboxProps extends ComponentProps<"input"> {
   name: string;
   label: string;
   showModified?: boolean;
   checkboxRight?: boolean;
}

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidCheckboxStyle = `${styles.checkbox} ${styles.invalid}`;
const modifiedCheckboxStyle = `${styles.checkbox} ${styles.modified}`;
const checkboxRightContainerStyle = `${styles.container} ${styles.right}`;

const Checkbox = ({ name, label, showModified, checkboxRight, ...rest }: CheckboxProps) => {
   // Get react-hook-form methods from the form context
   const {
      register,
      formState: { errors, dirtyFields },
   } = useFormContext();
   // Handle Attributes
   const id = rest.id ? rest.id : name;
   const isInvalid = !!errors[name];
   const isModified = showModified && !!dirtyFields[name];
   const inputClassName = isInvalid ? invalidCheckboxStyle : isModified ? modifiedCheckboxStyle : styles.checkbox;
   const containerClassName = checkboxRight ? checkboxRightContainerStyle : styles.container;
   return (
      <>
         <div className={containerClassName}>
            <label className={styles.label} htmlFor={id}>
               {label}
            </label>
            <input
               className={inputClassName}
               id={id}
               type="checkbox"
               aria-invalid={isInvalid}
               {...register(name)}
               {...rest}
            />
         </div>
         <ErrorMessage errors={errors} name={name} render={renderError} />
      </>
   );
};
export default Checkbox;
