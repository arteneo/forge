import React from "react";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";

interface FormContentFieldsProps {
    fields: FieldsInterface;
}

const FormContentFields = ({ fields }: FormContentFieldsProps) => {
    return (
        <>
            {Object.keys(fields).map((field) => (
                <React.Fragment key={field}>
                    {React.cloneElement(fields[field], {
                        name: fields[field].props.name || field,
                    })}
                </React.Fragment>
            ))}
        </>
    );
};

export default FormContentFields;
export { FormContentFieldsProps };
