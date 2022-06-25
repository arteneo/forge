import React from "react";
import * as Yup from "yup";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    // TextField as MuiTextField,
    // TextFieldProps,
} from "@mui/material";
// import { StatusBar, DragDrop, useUppy } from "@uppy/react";
import { DragDrop, useUppy } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
// import "@uppy/core/dist/style.css";
// import "@uppy/drag-drop/dist/style.css";
// import "@uppy/status-bar/dist/style.css";

import { Delete, DoneOutline } from "@mui/icons-material";
import { useForm } from "../../../components/Form/contexts/Form";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";

interface UploadFileSpecificProps {
    // onChange?: (
    //     //todo
    //     ///
    //     path: string,
    //     // eslint-disable-next-line
    //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    //     event: React.ChangeEvent<HTMLInputElement>,
    //     onChange: () => void,
    //     values: FormikValues,
    //     name: string
    // ) => void;
    onUploadComplete?: () => void; //todo
    uppyThumbnailWidth?: string;
    uppyThumbnailHeight?: string;
    chunkSize?: number;
}

type UploadFileProps = UploadFileSpecificProps & FieldInterface;

const UploadFile = ({
    //todo FINISH component with ImageUpload, view configuration, JWT token management, and auto logout temporary disabling/autorefresh
    // onChange,
    chunkSize = 5000000,
    uppyThumbnailWidth = "18rem",
    uppyThumbnailHeight = "18rem",
    onUploadComplete,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        //todo
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validate.required";
        }

        return undefined;
    },
    ...field
}: UploadFileProps) => {
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        registerField,
        unregisterField,
    }: FormikProps<FormikValues> = useFormikContext();
    const [image, setImage] = React.useState<string | undefined>(undefined);
    const { resolveField } = useForm();
    // const { name, path, label, error, hasError, help, required, disabled, hidden, validate } = resolveField({
    const { name, path, label, error, hasError, help, hidden, validate } = resolveField({
        values,
        touched,
        errors,
        submitCount,
        validate: fieldValidate,
        ...field,
    });

    React.useEffect(() => {
        if (hidden || typeof validate === "undefined") {
            return;
        }

        registerField(name, {
            validate: () => validate,
        });

        return () => {
            unregisterField(name);
        };
    }, [hidden, registerField, unregisterField, name, validate]);

    if (hidden) {
        return null;
    }

    const value = getIn(values, path, "") ?? "";

    React.useEffect(() => init(), [value]);

    const init = () => {
        if (value) {
            setImage("/" + value);
        }
    };

    const clear = () => {
        setFieldValue(name, "");
        setImage(undefined);
    };

    const uppy = useUppy(() => {
        return new Uppy({
            meta: { type: "public" },
            debug: true,
            restrictions: { maxNumberOfFiles: 2 },
            autoProceed: true,
        })
            .use(Tus, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt_token"),
                },
                chunkSize: chunkSize,
                endpoint: "/api/upload",
            })
            .use(ThumbnailGenerator, {
                id: "ThumbnailGenerator",
                thumbnailWidth: 200,
                thumbnailHeight: 200,
                waitForThumbnailsBeforeUpload: false,
            })
            .on("complete", (result) => {
                const parts = result.successful[0].uploadURL.split("/");
                // Last element of array which is token
                setFieldValue(name, parts.slice(-1)[0]);

                if (onUploadComplete) {
                    //todo
                    console.log("onUploadComplete");
                    // onUploadComplete(result, props, values, errors, touched, setFieldValue);
                }
            })
            .on("thumbnail:generated", (file, preview) => {
                setImage(preview);
            });
    });

    // const uppy = new Uppy({
    //     meta: { type: "public" },
    //     debug: true,
    //     restrictions: { maxNumberOfFiles: 2 },
    //     autoProceed: true,
    // });

    // uppy.use(Tus, {
    //     headers: {
    //         Authorization: "Bearer " + localStorage.getItem("jwt_token"),
    //     },
    //     chunkSize: chunkSize,
    //     endpoint: "/api/upload",
    // });

    // uppy.use(ThumbnailGenerator, {
    //     id: "ThumbnailGenerator",
    //     thumbnailWidth: 200,
    //     thumbnailHeight: 200,
    //     waitForThumbnailsBeforeUpload: false,
    // });

    // uppy.on("complete", (result) => {
    //     const parts = result.successful[0].uploadURL.split("/");
    //     // Last element of array which is token
    //     setFieldValue(name, parts.slice(-1)[0]);

    //     if (onUploadComplete) {
    //         //todo
    //         console.log("onUploadComplete");
    //         // onUploadComplete(result, props, values, errors, touched, setFieldValue);
    //     }
    // });

    // uppy.on("thumbnail:generated", (file, preview) => {
    //     setImage(preview);
    // });

    // const internalFieldProps: TextFieldProps = {
    //     // onChange: callableOnChange, //todo
    //     error: hasError,
    //     label,
    //     required,
    //     disabled,
    // };

    const thumbnailStyles = {
        width: uppyThumbnailWidth,
        height: uppyThumbnailHeight,
    };

    let helperText: null | React.ReactNode = null;

    if (hasError || help) {
        helperText = (
            <>
                {error}
                {hasError && <br />}
                {help}
            </>
        );
    }
    console.log(help);
    console.log(hasError);
    console.log(error);
    console.log(helperText);
    return (
        <FormControl error={hasError}>
            {label && (
                <InputLabel htmlFor={name} shrink={true}>
                    {label}
                </InputLabel>
            )}
            <div>
                <div>
                    <div>
                        <DragDrop
                            // id={name}
                            // uploadAction={props.uploadAction}
                            // uploadHelp={props.uploadHelp}
                            uppy={uppy}
                        />
                    </div>
                    <div style={thumbnailStyles}>
                        {image && (
                            <IconButton size="small" onClick={() => clear()}>
                                <Delete />
                            </IconButton>
                        )}
                        {image && (
                            <div>
                                <DoneOutline />
                            </div>
                        )}
                    </div>
                </div>

                {/* <StatusBar uppy={uppy} hideAfterFinish={false} showProgressDetails /> */}
            </div>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
    // return (
    //     <FormControl {...formControlProps}>
    //         {label && (
    //             <InputLabel htmlFor={props.id} shrink={true}>
    //                 {label}
    //             </InputLabel>
    //         )}
    //         <div className={classes.uppy}>
    //             <div className={classes.uppyUpload}>
    //                 <div className={classes.uppyDropzone}>
    //                     <DragDrop
    //                         id={props.id}
    //                         uploadAction={props.uploadAction}
    //                         uploadHelp={props.uploadHelp}
    //                         uppy={uppy}
    //                     />
    //                 </div>
    //                 <div className={classes.uppyThumbnail + " ForgeUppyThumbnail"} style={thumbnailStyles}>
    //                     {image && (
    //                         <IconButton className={classes.uppyThumbnailAction} size="small" onClick={() => clear()}>
    //                             <Delete />
    //                         </IconButton>
    //                     )}
    //                     {image && (
    //                         <div className={classes.uppyThumbnailFile}>
    //                             <DoneOutline className={classes.uppyThumbnailFileIcon} />
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>

    //             <StatusBar uppy={uppy} hideAfterFinish={false} showProgressDetails />
    //         </div>
    //         {helperText && <FormHelperText>{helperText}</FormHelperText>}
    //     </FormControl>
    // );
    // //.
    // const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFieldValue(path, event.currentTarget.value);
    // };

    // const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (onChange) {
    //         onChange(path, setFieldValue, event, () => defaultOnChange(event), values, name);
    //         return;
    //     }

    //     defaultOnChange(event);
    // };

    // if (hasError || help) {
    //     internalFieldProps.helperText = (
    //         <>
    //             {error}
    //             {hasError && <br />}
    //             {help}
    //         </>
    //     );
    // }

    // const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    // return <MuiTextField {...mergedFieldProps} />;
};

export default UploadFile;
export { UploadFileProps, UploadFileSpecificProps };
