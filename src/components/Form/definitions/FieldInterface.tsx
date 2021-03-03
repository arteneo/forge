import { FormikValues, FormikTouched, FormikErrors } from "formik";
import FieldHelpType from "@arteneo/forge/components/Form/definitions/FieldHelpType";
import FieldLabelType from "@arteneo/forge/components/Form/definitions/FieldLabelType";

interface FieldInterface {
    // name is added to props by FormContent
    name?: string;
    label?: FieldLabelType;
    disableAutoLabel?: boolean;
    disableTranslateLabel?: boolean;
    help?: FieldHelpType;
    disableTranslateHelp?: boolean;
    disabled?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    hidden?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    // eslint-disable-next-line
    transformInitialValue?: (value: any) => any;
    placeholder?: string;
    disableUnderline?: boolean;
}

export default FieldInterface;
