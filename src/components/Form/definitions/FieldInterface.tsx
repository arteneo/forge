import FieldRequiredType from "../../../components/Form/definitions/FieldRequiredType";
import FieldLabelType from "../../../components/Form/definitions/FieldLabelType";
import FieldHelpType from "../../../components/Form/definitions/FieldHelpType";
import FieldDisabledType from "../../../components/Form/definitions/FieldDisabledType";
import FieldHiddenType from "../../../components/Form/definitions/FieldHiddenType";
import FieldValidateType from "../../../components/Form/definitions/FieldValidateType";

interface FieldInterface {
    // name should be added to props while rendering
    name?: string;
    path?: string;
    required?: FieldRequiredType;
    label?: FieldLabelType;
    disableAutoLabel?: boolean;
    disableTranslateLabel?: boolean;
    help?: FieldHelpType;
    disableTranslateHelp?: boolean;
    disabled?: FieldDisabledType;
    hidden?: FieldHiddenType;
    validate?: FieldValidateType;
    disableValidateTranslate?: boolean;
    // eslint-disable-next-line
    transformInitialValue?: (value: any) => any;
}

export default FieldInterface;
