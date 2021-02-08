import React from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, ButtonProps } from "@material-ui/core";

interface Props {
    submitLabel?: string;
    submitProps?: ButtonProps;
}

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(4),
        display: "flex",
        justifyContent: "space-between",
    },
    buttonsSave: {
        display: "flex",
        flexGrow: 1,
    },
    buttonSave: {
        order: 1,
        marginLeft: theme.spacing(1),
    },
    buttonSaveAndBack: {
        order: 2,
        marginLeft: theme.spacing(1),
    },
}));

const FormButtons: React.FC<Props> = ({
    submitLabel = "action.form.submit",
    submitProps = {
        variant: "contained",
        color: "primary",
    },
}: Props) => {
    const { isSubmitting } = useFormikContext();
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Box mt={4}>
            <Button type="submit" disabled={isSubmitting} className={classes.buttonSave} {...submitProps}>
                {t(submitLabel)}
            </Button>
        </Box>
    );
};

export default FormButtons;
