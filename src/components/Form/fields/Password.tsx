import React from "react";
import Text, { TextProps } from "../../../components/Form/fields/Text";

type PasswordProps = TextProps;

const Password = (textProps: PasswordProps) => {
    return (
        <Text
            {...{
                fieldProps: {
                    type: "password",
                    ...(textProps?.fieldProps ?? {}),
                },
                ...textProps,
            }}
        />
    );
};

export default Password;
export { PasswordProps };
