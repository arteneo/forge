
import { Text, type TextProps } from "../../../components/Form/fields/Text";

type PasswordProps = TextProps;

const Password = (textProps: PasswordProps) => {
    return (
        <Text
            {...{
                ...textProps,

                fieldProps: {
                    type: "password",
                    ...textProps?.fieldProps,
                },
            }}
        />
    );
};

export { Password, type PasswordProps };
