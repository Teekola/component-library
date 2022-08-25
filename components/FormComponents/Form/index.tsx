import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./form.module.css";
import { FieldValues, schema } from "./schema";

export default function Form({ children }: PropsWithChildren) {
   const methods = useForm<FieldValues>({ resolver: yupResolver(schema) });
   const {
      handleSubmit,
      setError,
      formState: { errors },
   } = methods;

   const onSubmit = async (data: FieldValues) => {
      console.log(data);
   };

   return (
      <FormProvider {...methods}>
         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {children}
         </form>
      </FormProvider>
   );
}
