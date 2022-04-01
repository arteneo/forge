import React from "react";
import Text, { TextProps } from "../../../components/Form/fields/Text";

interface TextareaSpecificProps {
    resize?: "none" | "vertical" | "horizontal" | "both";
}

type TextareaProps = TextareaSpecificProps & TextProps;

const Textarea = ({ resize = "vertical", ...textProps }: TextareaProps) => {
    return (
        <Text
            {...{
                ...textProps,
                fieldProps: {
                    multiline: true,
                    minRows: 3,
                    maxRows: 6,
                    ...(textProps?.fieldProps ?? {}),
                    InputProps: {
                        sx: {
                            "& textarea": {
                                resize,
                            },
                            ...(textProps?.fieldProps?.InputProps?.sx ?? {}),
                        },
                        ...(textProps?.fieldProps?.InputProps ?? {}),
                    },
                },
            }}
        />
    );
};

export default Textarea;
export { TextareaProps };
