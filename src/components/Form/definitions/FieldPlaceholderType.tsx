import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldPlaceholderType =
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => string | undefined)
    | string
    | undefined;

export default FieldPlaceholderType;
