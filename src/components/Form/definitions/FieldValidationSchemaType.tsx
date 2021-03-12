import { FormikValues, FormikTouched, FormikErrors } from "formik";
import ValidationSchemaInterface from "@arteneo/forge/components/Form/definitions/ValidationSchemaInterface";

type FieldValidationSchemaType =
    | ValidationSchemaInterface
    | ((
          defaultValidationSchema: ValidationSchemaInterface,
          hidden: boolean,
          required: boolean,
          values: FormikValues,
          touched: FormikTouched<FormikValues>,
          errors: FormikErrors<FormikValues>,
          name: string
      ) => ValidationSchemaInterface);

export default FieldValidationSchemaType;
