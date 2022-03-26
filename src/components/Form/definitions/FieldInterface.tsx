import { FormikValues, FormikTouched, FormikErrors } from "formik";
import FieldHelpType from "../../../components/Form/definitions/FieldHelpType";
import FieldLabelType from "../../../components/Form/definitions/FieldLabelType";

interface FieldInterface {
    // name is added to props by FormContent
    name?: string;
    path?: string;
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
}

export default FieldInterface;
