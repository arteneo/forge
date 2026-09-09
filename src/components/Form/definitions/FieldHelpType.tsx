import { FormikValues, FormikTouched, FormikErrors } from "formik";
import React from "react";

type FieldHelpType =
    | boolean
    | React.ReactNode
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string,
      ) => React.ReactNode);

export default FieldHelpType;
