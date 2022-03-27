import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldHiddenType =
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => boolean)
    | boolean;

export default FieldHiddenType;
