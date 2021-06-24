import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { FormControl, FormControlProps, FormHelperText, InputLabel, InputLabelProps } from "@material-ui/core";
import MuiRichTextEditor, { TMUIRichTextEditorRef, TMUIRichTextEditorProps, TCustomControl } from "@arteneo/mui-rte";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";
import { headerControl, HeaderPopover } from "@arteneo/forge/components/RichText/components/Header";

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
    const [anchorHeader, setAnchorHeader] = React.useState<null | HTMLElement>(null);
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    let editorState: undefined | EditorState = undefined;
    const [defaultValue, setDefaultValue] = React.useState<undefined | string>(undefined);

    const value = getIn(values, path, "");
    React.useEffect(() => updateDefaultValue(), [value]);

    const updateDefaultValue = () => {
        let editorStateHTML = undefined;
        if (editorState !== undefined) {
            editorStateHTML = convertDraftJsStateToHtml(editorState);
        }

        if (value !== editorStateHTML) {
            setDefaultValue(convertHtmlToDraftJsContent(value));
        }
    };

    const defaultOnChange = (data: string) => {
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
        "header",
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

    const customControls: TCustomControl[] = [headerControl(setAnchorHeader)];

    const internalRichTextProps: TMUIRichTextEditorProps = {
        controls,
        customControls,
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
            {anchorHeader && (
                <HeaderPopover
                    {...{
                        anchor: anchorHeader,
                        muiRteRef: ref,
                        close: () => setAnchorHeader(null),
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
