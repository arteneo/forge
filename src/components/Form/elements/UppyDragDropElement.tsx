import React, { MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { Typography, IconButton, makeStyles } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Uppy, { Restrictions, TypeChecking, UppyFile } from "@uppy/core";
import getDroppedFiles from "@uppy/utils/lib/getDroppedFiles";
import toArray from "@uppy/utils/lib/toArray";
// import { getDroppedFiles, toArray } from "@uppy/utils/lib/getDroppedFiles";

// const getDroppedFiles = require("@uppy/utils/lib/getDroppedFiles");
// const toArray = require("@uppy/utils/lib/toArray");

interface UppyDragDropElementSpecificProps {
    id: string;
    // uppy: typeof Uppy<Uppy.TypeChecking>;
    uppy: Uppy.Uppy;
    uploadAction: string;
    uploadHelp: string;
    fileRestrictions: Restrictions;
}
type UppyDragDropElementProps = UppyDragDropElementSpecificProps; //& FieldElementPlaceholderInterface;

const useStyles = makeStyles((theme) => ({
    uppyDropzone: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme.palette.grey["200"],
        borderRadius: theme.shape.borderRadius,
    },
    uppyInputFile: {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
    },
}));

const UppyDragDropElement = (props: UppyDragDropElementSpecificProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [draggingOver, setDraggingOver] = React.useState(false);
    const inputFile = React.useRef<HTMLInputElement>(null);

    let removeDragOverClassTimeout: ReturnType<typeof setTimeout>;

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }

        setDraggingOver(false);

        props.uppy.log("[DragDrop] Files were dropped");
        const logDropError = (error: string) => {
            props.uppy.log(error, "error");
        };
        getDroppedFiles(e.dataTransfer, { logDropError }).then((files: File[]) => {
            files.forEach(addFile);
        });
    };

    const addFile = (file: File) => {
        try {
            props.uppy.addFile({
                source: props.id,
                name: file.name,
                type: file.type,
                data: file,
                //TODO CHECK IF NEEDEED
                // meta: {
                //     relativePath: file.relativePath || null,
                // },
            });
        } catch (err) {
            if (!err.isRestriction) {
                props.uppy.log(err);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDraggingOver(true);

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }

        removeDragOverClassTimeout = setTimeout(() => {
            setDraggingOver(false);
        }, 50);
    };

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = toArray(target.files) as File[];
        files.forEach((file) => {
            addFile(file);
        });

        //TODO is this needed
        // target.value = null;
        // e.target = target;
    };

    return (
        <div
            className={classes.uppyDropzone + " ForgeUppyDropzone"}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
        >
            <IconButton
                onClick={() => {
                    // eslint-disable-next-line
                    return inputFile?.current?.click();
                }}
                color={draggingOver ? "primary" : "default"}
            >
                <input
                    className={classes.uppyInputFile}
                    type="file"
                    tabIndex={-1}
                    ref={inputFile}
                    accept={
                        props.fileRestrictions.allowedFileTypes
                            ? props.fileRestrictions.allowedFileTypes.join(",")
                            : undefined
                    }
                    onChange={onInputChange}
                />
                <CloudUpload fontSize="large" />
            </IconButton>
            <Typography variant="h6">{t(props.uploadAction || "action.dragAndDrop")}</Typography>
            {props.uploadHelp && <Typography variant="subtitle2">{t(props.uploadHelp)}</Typography>}
        </div>
    );
};

export default UppyDragDropElement;
