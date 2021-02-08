import React from "react";
import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldHelpType =
    | boolean
    | React.ReactNode
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => React.ReactNode);

export default FieldHelpType;
