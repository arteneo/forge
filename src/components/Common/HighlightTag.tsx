import { Box } from "@mui/material";
import React from "react";

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

export { HighlightTag, type HighlightTagProps };
