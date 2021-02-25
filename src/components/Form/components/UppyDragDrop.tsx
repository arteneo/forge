import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, IconButton, makeStyles } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const getDroppedFiles = require("@uppy/utils/lib/getDroppedFiles");
const toArray = require("@uppy/utils/lib/toArray");

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

const UppyDragDrop = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [draggingOver, setDraggingOver] = React.useState(false);
    const inputFile = React.useRef(null);

    let removeDragOverClassTimeout;

    const handleDrop = (e, dropCategory) => {
        e.preventDefault();
        e.stopPropagation();

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }

        setDraggingOver(false);

        props.uppy.log("[DragDrop] Files were dropped");
        const logDropError = (error) => {
            props.uppy.log(error, "error");
        };
        getDroppedFiles(e.dataTransfer, { logDropError }).then((files) => {
            files.forEach(addFile);
        });
    };

    const addFile = (file) => {
        try {
            props.uppy.addFile({
                source: props.id,
                name: file.name,
                type: file.type,
                data: file,
                meta: {
                    relativePath: file.relativePath || null,
                },
            });
        } catch (err) {
            if (!err.isRestriction) {
                props.uppy.log(err);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDraggingOver(true);

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (removeDragOverClassTimeout) {
            clearTimeout(removeDragOverClassTimeout);
        }

        removeDragOverClassTimeout = setTimeout(() => {
            setDraggingOver(false);
        }, 50);
    };

    const onInputChange = (e) => {
        const files = toArray(e.target.files);
        files.forEach((file) => {
            addFile(file);
        });

        e.target.value = null;
    };

    return (
        <div
            className={classes.uppyDropzone + " ForgeUppyDropzone"}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
        >
            <IconButton onClick={() => inputFile.current.click()} color={draggingOver ? "primary" : "default"}>
                <input
                    className={classes.uppyInputFile}
                    type="file"
                    tabIndex={-1}
                    ref={inputFile}
                    accept={props.uppy.opts.restrictions.allowedFileTypes}
                    onChange={onInputChange}
                />
                <CloudUpload fontSize="large" />
            </IconButton>
            <Typography variant="h6">{t(props.uploadAction || "action.dragAndDrop")}</Typography>
            {props.uploadHelp && <Typography variant="subtitle2">{t(props.uploadHelp)}</Typography>}
        </div>
    );
};

export default UppyDragDrop;
