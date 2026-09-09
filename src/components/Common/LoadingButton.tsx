import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
    loading?: boolean;
}

const LoadingButton = ({ loading = false, ...props }: LoadingButtonProps) => {
    return (
        <Button
            {...{
                ...props,
                disabled: loading ? true : props.disabled,
                endIcon: loading ? <CircularProgress {...{ color: "inherit", size: 16 }} /> : props.endIcon,
            }}
        />
    );
};

export default LoadingButton;
export { LoadingButtonProps };
