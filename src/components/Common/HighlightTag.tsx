import React from "react";
import { Box } from "@mui/material";

interface HighlightTagProps {
    children: React.ReactNode;
}

const HighlightTag = ({ children }: HighlightTagProps) => {
    return (
        <Box
            {...{
                component: "span",
                sx: {
                    color: "primary.main",
                    fontWeight: 700,
                },
                children,
            }}
        />
    );
};

export default HighlightTag;
export { HighlightTagProps };
