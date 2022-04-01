import React from "react";
import * as Yup from "yup";
import Text, { TextProps } from "../../../components/Form/fields/Text";

type EmailProps = TextProps;

const Email = (textProps: EmailProps) => {
    return (
        <Text
            {...{
                // eslint-disable-next-line
                validate: (value: any) =>
                    !Yup.string().email().isValidSync(value) ? "validate.emailInvalid" : undefined,
                ...textProps,
                fieldProps: {
                    type: "email",
                    ...(textProps?.fieldProps ?? {}),
                },
            }}
        />
    );
};

export default Email;
export { EmailProps };
