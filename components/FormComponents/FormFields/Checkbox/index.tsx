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
   required?: boolean;
}

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidCheckboxStyle = `${styles.checkbox} ${styles.invalid}`;
const modifiedCheckboxStyle = `${styles.checkbox} ${styles.modified}`;
const labelRightStyle = `${styles.label} ${styles.right}`;

const Checkbox = ({ name, label, showModified, checkboxRight, required, ...rest }: CheckboxProps) => {
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
   let labelClassName = checkboxRight ? labelRightStyle : styles.label;
   if (required) labelClassName += ` ${styles.required}`;
   return (
      <div>
         <label className={labelClassName} htmlFor={id}>
            <input
               className={inputClassName}
               id={id}
               type="checkbox"
               aria-invalid={isInvalid}
               {...register(name)}
               {...rest}
            />
            {label}
         </label>
         <ErrorMessage errors={errors} name={name} render={renderError} />
      </div>
   );
};
export default Checkbox;
