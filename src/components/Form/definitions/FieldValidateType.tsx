import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldValidateType =
    | ((
          // eslint-disable-next-line
          value: any,
          required: boolean,
          disabled: boolean,
          values: FormikValues,
          name: string,
          path: string,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>
      ) => string | undefined)
    | string
    | undefined;

export default FieldValidateType;
