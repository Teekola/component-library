import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../FormFields/InputField";
import styles from "./form.module.css";
import SelectField from "../FormFields/SelectField";
import SubmitButton from "../FormFields/SubmitButton";
import Checkbox from "../FormFields/Checkbox";

// Country options field settings
type Country = "Suomi" | "Ruotsi" | "Muu";
const countryOptions: Country[] = ["Suomi", "Ruotsi", "Muu"];
const countryDefault = "--Valitse maa--";

// Yup Schema
const schema = yup.object({
   email: yup.string().required("Sähköpostiosoite vaaditaan.").email("Sähköpostiosoitteen tulee olla validi."),
   country: yup.string().required().oneOf(countryOptions, "Kotimaa vaaditaan."),
   terms: yup.boolean().default(false),
   terms2: yup.boolean().default(false),
   terms3: yup.boolean().oneOf([true], "Valinta on pakollinen.").default(false),
});
// Type for the form inferred from the Yup Schema
type InferredFieldValues = yup.InferType<typeof schema>;

// Replace selected types for more accurate typings
interface FieldValues extends InferredFieldValues {
   country: Country;
}

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
            <SelectField
               name="country"
               label="Kotimaa"
               options={[countryDefault, ...countryOptions]}
               defaultValue={countryDefault}
            />

            <Checkbox name="terms" label="Hyväksy ehdot" />
            <Checkbox name="terms2" label="Hyväksy asiakastietojen käsittely" />
            <Checkbox name="terms3" label="Hyväksy kaikki mahdollinen" aria-required />

            <SubmitButton label="Lähetä" />
         </form>
      </FormProvider>
   );
}
