import { FormikValues, FormikTouched, FormikErrors } from "formik";
import React from "react";

type FieldLabelType =
    | ((
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
    ) => React.ReactNode)
    | React.ReactNode;

export { type FieldLabelType };
