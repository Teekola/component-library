import * as yup from "yup";

// Yup Schema
export const schema = yup.object({
   name: yup.string().required("Nimi vaaditaan."),
   email: yup
      .string()
      .required("Sähköpostiosoite vaaditaan. Lähetämme tiedon mahdollisesta voitosta tähän osoitteeseen.")
      .email("Tarkista, että kirjoitit sähköpostin oikein."),
   course: yup.string().required().oneOf(["arvo1", "arvo2"], "Valitse kurssi"),
   video: yup.mixed().test("fileChosen", "Valitse video tietokoneelta.", (value) => value.length > 0 && value[0]),
   permission: yup.boolean().default(false).oneOf([true], "Valinta on pakollinen."),
});
// Type for the form inferred from the Yup Schema
type InferredFieldValues = yup.InferType<typeof schema>;

// Replace selected types for more accurate typings
export interface FieldValues extends InferredFieldValues {
   course: "arvo1" | "arvo2";
}
