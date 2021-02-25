import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    IconButton,
    InputLabel,
    InputLabelProps,
    makeStyles,
} from "@material-ui/core";
import { StatusBar } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import { Delete, DoneOutline } from "@material-ui/icons";
import UppyDragDrop from "@arteneo/forge/components/Form/components/UppyDragDrop";

interface UploadElementProps {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void
    ) => void;
    required: boolean;
    disabled: boolean;
    labelProps?: InputLabelProps;
    formControlProps?: FormControlProps;
    chunkSize?: number;
    // TODO This thumbnail width/height needs some rethinking
    uppyThumbnailWidth?: string;
    uppyThumbnailHeight?: string;
}

const useStyles = makeStyles((theme) => ({
    uppy: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
        flexGrow: 1,
    },
    uppyUpload: {
        display: "flex",
    },
    uppyDropzone: {
        flexGrow: 1,
        marginRight: theme.spacing(3),
    },
    uppyThumbnail: {
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.grey["200"],
        borderRadius: theme.shape.borderRadius,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center center",
    },
    uppyThumbnailAction: {
        position: "absolute",
        top: "5px",
        right: "5px",
    },
    uppyThumbnailFile: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    uppyThumbnailFileIcon: {
        fontSize: "4rem",
    },
}));
const UploadElement = ({
    name,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    labelProps,
    formControlProps,
    chunkSize = 5000000,
    uppyThumbnailWidth = "18rem",
    uppyThumbnailHeight = "18rem",
}: UploadElementProps) => {
    const classes = useStyles();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();
    const value = getIn(values, name, "");

    const [image, setImage] = React.useState("");
    React.useEffect(() => init(), [value]);

    const init = () => {
        if (value) {
            setImage("/" + value);
        }
    };

    const clear = () => {
        setFieldValue(name, "");
        setImage("");
    };

    // const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFieldValue(name, event.currentTarget.value);
    // };

    // const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (onChange) {
    //         onChange(name, setFieldValue, event, () => defaultOnChange(event));
    //         return;
    //     }

    //     defaultOnChange(event);
    // };

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalLabelProps: InputLabelProps = {
        shrink: true,
        error: hasError,
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

    // TODO Needs to be changed
    const auth: any = {};

    const uppyId = "uppy-large-file-upload-" + name;

    const uppy = Uppy({
        id: uppyId,
        meta: { type: "public" },
        debug: true,
        restrictions: { maxNumberOfFiles: 2 },
        autoProceed: true,
    });

    uppy.use(Tus, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
        resume: false,
        limit: 1,
        chunkSize: chunkSize,
        endpoint: "/api/upload",
    });

    uppy.use(ThumbnailGenerator, {
        id: "ThumbnailGenerator",
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        waitForThumbnailsBeforeUpload: false,
    });

    uppy.on("complete", (result) => {
        if (result.failed.length > 0) {
            const fileId = result.failed[0].id;
            const error = result.failed[0].error;

            auth.subscribeJwtTokenRefresh(
                (token) => {
                    refreshTokenCallback(token, fileId);
                },
                uppyId,
                false,
                false
            );
            auth.refreshTokenAndReattemptRequest(error, null);
        }
        if (result.successful.length > 0) {
            auth.unSubscribeJwtTokenRefresh(uppyId);
            const parts = result.successful[0].uploadURL.split("/");
            // Last element of array which is token
            setFieldValue(name, parts.slice(-1)[0]);

            // TODO
            // if (props.onUploadComplete) {
            //     props.onUploadComplete(result, props, values, errors, touched, setFieldValue);
            // }
        }
    });

    const refreshTokenCallback = (token, failedFileId) => {
        let tus = uppy.getPlugin("Tus");
        tus.opts.headers.Authorization = "Bearer " + token;
        if (failedFileId) {
            uppy.retryUpload(failedFileId);
        }
    };

    uppy.on("upload", (data) => {
        auth.subscribeJwtTokenRefresh(
            (token) => {
                refreshTokenCallback(token, null);
            },
            uppyId,
            false,
            false
        );
    });

    uppy.on("cancel-all", (data) => {
        auth.unSubscribeJwtTokenRefresh(uppyId);
    });

    uppy.on("thumbnail:generated", (file, preview) => {
        setImage(preview);
    });

    let thumbnailStyles = {
        width: uppyThumbnailWidth,
        height: uppyThumbnailHeight,
    };

    return (
        <FormControl {...mergedFormControlProps}>
            {label && <InputLabel {...mergedLabelProps}>{label}</InputLabel>}
            <div className={classes.uppy}>
                <div className={classes.uppyUpload}>
                    <div className={classes.uppyDropzone}>
                        <UppyDragDrop
                            id={uppyId}
                            // TODO
                            // uploadAction={uploadAction}
                            // uploadHelp={uploadHelp}
                            uppy={uppy}
                        />
                    </div>
                    <div className={classes.uppyThumbnail + " ForgeUppyThumbnail"} style={thumbnailStyles}>
                        {image && (
                            <IconButton className={classes.uppyThumbnailAction} size="small" onClick={() => clear()}>
                                <Delete />
                            </IconButton>
                        )}
                        {image && (
                            <div className={classes.uppyThumbnailFile}>
                                <DoneOutline className={classes.uppyThumbnailFileIcon} />
                            </div>
                        )}
                    </div>
                </div>

                <StatusBar uppy={uppy} hidePauseResumeButton={true} hideAfterFinish={false} showProgressDetails />
            </div>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default UploadElement;
export { UploadElementProps };
