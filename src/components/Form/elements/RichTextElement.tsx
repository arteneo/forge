import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { FormControl, FormControlProps, FormHelperText, InputLabel, InputLabelProps } from "@material-ui/core";
import MuiRichTextEditor, {
    TMUIRichTextEditorRef,
    TMUIRichTextEditorProps,
    TToolbarComponentProps,
} from "/var/www/mui-rte/src/MUIRichTextEditor";
import { EditorState, convertToRaw, convertFromRaw, RichUtils } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";
import { headingControl, HeadingPopover } from "@arteneo/forge/components/RichText/components/Heading";

interface RichTextElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        data: string,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    richTextProps?: TMUIRichTextEditorProps;
    formControlProps?: FormControlProps;
    labelProps?: InputLabelProps;
}

type RichTextElementProps = RichTextElementSpecificProps & FieldElementPlaceholderInterface;

const convertHtmlToDraftJsContent = (html?: string): undefined | string => {
    try {
        if (html) {
            return JSON.stringify(convertToRaw(stateFromHTML(html)));
        }
    } catch (error) {
        // When error occurs while converting value return undefined value (mui-rte does not handle this case)
    }

    return undefined;
};

const convertDraftJsContentToHtml = (content: string): undefined | string => {
    try {
        return stateToHTML(convertFromRaw(JSON.parse((content as unknown) as string)));
    } catch (error) {
        // When error occurs while converting value return undefined value (mui-rte does not handle this case)
    }

    return undefined;
};

const convertDraftJsStateToHtml = (state: EditorState): undefined | string => {
    try {
        return stateToHTML(state.getCurrentContent());
    } catch (error) {
        // When error occurs while converting value return undefined value (mui-rte does not handle this case)
    }

    return undefined;
};

const RichTextElement = ({
    name,
    path,
    label,
    placeholder,
    error,
    help,
    required,
    disabled,
    onChange,
    richTextProps,
    formControlProps,
    labelProps,
}: RichTextElementProps) => {
    const ref = React.useRef<TMUIRichTextEditorRef>(null);
    const [anchorHeading, setAnchorHeading] = React.useState<undefined | HTMLElement>(undefined);
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    let editorState = undefined;
    const [defaultValue, setDefaultValue] = React.useState<undefined | string>(undefined);

    const value = getIn(values, path, "");
    React.useEffect(() => updateDefaultValue(), [value]);

    const updateDefaultValue = () => {
        let editorStateHTML = undefined;
        if (editorState !== undefined) {
            editorStateHTML = stateToHTML(editorState.getCurrentContent());
        }

        if (value !== editorStateHTML) {
            console.log("🚀 ~ file: RichTextElement.tsx ~ line 99 ~ updateDefaultValue ~ value", value);
            setDefaultValue(convertHtmlToDraftJsContent(value));
        }
    };
    // console.log("🚀 ~ file: RichTextElement.tsx ~ line 79 ~ editorState", editorState);
    // console.log(
    //     "🚀 ~ file: RichTextElement.tsx ~ line 79 ~ editorState.getCurrentContent",
    //     editorState.getCurrentContent()
    // );

    // TODO NOW
    // Robimy useState poczynając od undefined
    // Robimy useEffect na zmianie zczytanego getIn values
    // Na MUI RTE na onChange zapisujemy sobie editorState (zmianna, nie musi być na state)
    // Robimy w useEffect tak, że porównujemy konwersję z editorState do tej z getIn values - jak inne to nadpisz, jak nie to zostaw
    // Powinno zadziałać ;)

    const defaultOnChange = (data: EditorState) => {
        setFieldValue(path, convertDraftJsContentToHtml(data));
    };

    const callableOnChange = (data: string) => {
        if (onChange) {
            onChange(path, setFieldValue, data, () => defaultOnChange(data), values, name);
            return;
        }

        defaultOnChange(data);
    };

    const hasError = error ? true : false;

    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const onBlur = () => {
        ref.current?.save();
    };

    const controls = [
        "heading",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "undo",
        "redo",
        "numberList",
        "bulletList",
        "clear",
        "save",
        // "my-style",
        "link",
        "media",
    ];

    const customControls = [headingControl(setAnchorHeading)];
    const customStyleMap = {
        COLOR_FF00FF: {
            color: "#FF00FF",
        },
    };

    const internalRichTextProps: TMUIRichTextEditorProps = {
        controls,
        customControls,
        draftEditorProps: {
            customStyleMap,
        },
        defaultValue,
        label: placeholder,
        readOnly: disabled,
        onChange: (state) => (editorState = state),
        onSave: callableOnChange,
        onBlur,
    };

    const internalLabelProps: InputLabelProps = {
        shrink: true,
        error: hasError,
        required: required,
    };
    const mergedLabelProps = Object.assign(internalLabelProps, labelProps);

    let helperText = undefined;

    if (hasError || help) {
        helperText = (
            <>
                {error}
                {hasError && <br />}
                {help}
            </>
        );
    }

    const mergedRichTextProps = Object.assign(internalRichTextProps, richTextProps);

    return (
        <FormControl {...mergedFormControlProps}>
            {label && <InputLabel {...mergedLabelProps}>{label}</InputLabel>}
            <MuiRichTextEditor ref={ref} {...mergedRichTextProps} />
            {anchorHeading && (
                <HeadingPopover
                    {...{
                        anchor: anchorHeading,
                        muiRteRef: ref,
                        close: () => setAnchorHeading(undefined),
                    }}
                />
            )}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default RichTextElement;
export {
    RichTextElementProps,
    RichTextElementSpecificProps,
    convertHtmlToDraftJsContent,
    convertDraftJsContentToHtml,
    convertDraftJsStateToHtml,
};
