import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldRequiredType =
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => boolean)
    | boolean;

export default FieldRequiredType;
