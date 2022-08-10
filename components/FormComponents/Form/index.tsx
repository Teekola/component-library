import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../FormFields/InputField";
import styles from "./form.module.css";

// Yup Schema
const schema = yup.object({
   email: yup.string().required("Sähköpostiosoite vaaditaan.").email("Sähköpostiosoitteen tulee olla validi."),
});
// Type for the form inferred from the Yup Schema
type FieldValues = yup.InferType<typeof schema>;

export default function Form() {
   const methods = useForm<FieldValues>({ resolver: yupResolver(schema) });
   const { handleSubmit } = methods;

   const onSubmit = (data: FieldValues) => {
      console.log(data);
   };

   return (
      <FormProvider {...methods}>
         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
               name="email"
               label="Sähköpostiosoite"
               inputMode="email"
               autoComplete="email"
               aria-autocomplete="both"
            />
         </form>
      </FormProvider>
   );
}
