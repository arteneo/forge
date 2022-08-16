import { FormikValues, FormikTouched, FormikErrors } from "formik";
import TranslateVariablesInterface from "../../../definitions/TranslateVariablesInterface";

type FieldLabelVariablesType =
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => TranslateVariablesInterface)
    | TranslateVariablesInterface;

export default FieldLabelVariablesType;
