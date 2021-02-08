import React from "react";
import { FormikValues, FormikTouched, FormikErrors } from "formik";

type FieldLabelType =
    | ((
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => React.ReactNode)
    | React.ReactNode;

export default FieldLabelType;
