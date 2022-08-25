import { ComponentProps, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./videoField.module.css";

// Require name and label, accept all HTML input field's attributes
interface InputFieldProps extends ComponentProps<"input"> {
   name: string;
   label: string;
   instruction: string;
   required?: boolean;
}

// Transform size to MB or GB
const bytesToMegaBytesOrGigabytes = (bytes: number) =>
   bytes / 1000000 <= 999 ? (bytes / 1000000).toPrecision(3) + " MB" : (bytes / 1000000000).toPrecision(3) + " GB";

// Render error messages
const renderError = ({ message }: { message: string }) => <p className={styles.errorMessage}>{message}</p>;

// Complex field styles
const invalidBrowse = `${styles.browse} ${styles.invalid}`;
const invalidFileSizeStyle = `${styles.fileSize} ${styles.errorMessage}`;
const requiredLabelStyle = `${styles.label} ${styles.required}`;

const enterSpaceListener = (e: KeyboardEvent) => {
   if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
      const fileField = document.getElementById("fileInput");
      if (document.activeElement === fileField) {
         fileField?.click();
      }
   }
};

const VideoField = ({ name, label, instruction, required, ...rest }: InputFieldProps) => {
   // Get react-hook-form methods from the form context
   const {
      register,
      formState: { errors },
      watch,
   } = useFormContext();

   // Handle display
   const video = watch("video") && watch("video")[0];
   const fileName = video ? video.name : instruction;
   const fileSize = video ? bytesToMegaBytesOrGigabytes(video.size) : "";

   // Handle Attributes
   const id = rest.id ? rest.id : name;
   const isInvalid = !!errors[name];
   const browseClassName = isInvalid ? invalidBrowse : styles.browse;
   const fileSizeClassName = isInvalid ? invalidFileSizeStyle : styles.fileSize;
   const labelClassName = required ? requiredLabelStyle : styles.label;

   useEffect(() => {
      document.addEventListener("keyup", (e) => enterSpaceListener(e));
      return document.removeEventListener("keyup", (e) => enterSpaceListener(e));
   });

   return (
      <div className={styles.container}>
         <label className={labelClassName}>{label}</label>
         <label className={browseClassName} htmlFor={id} tabIndex={0} id="fileInput">
            <input readOnly className={styles.fileName} value={fileName} tabIndex={-1} />
            <span className={fileSizeClassName}>{fileSize}</span>
         </label>
         <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            {...register("video")}
            style={{ visibility: "hidden", position: "absolute" }}
            id={id}
         />
         <ErrorMessage errors={errors} name={name} render={renderError} />
      </div>
   );
};
export default VideoField;
