import React from "react";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";

interface FormContentFieldsProps {
    fields: FieldsInterface;
    // eslint-disable-next-line
    validationSchema?: any;
}

const FormContentFields = ({ fields, validationSchema }: FormContentFieldsProps) => {
    return (
        <>
            {Object.keys(fields).map((field) => (
                <React.Fragment key={field}>
                    {React.cloneElement(fields[field], {
                        validationSchema: validationSchema?.[field],
                        name: fields[field].props.name || field,
                    })}
                </React.Fragment>
            ))}
        </>
    );
};

export default FormContentFields;
export { FormContentFieldsProps };
