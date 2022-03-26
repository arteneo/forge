import React from "react";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";

interface FormViewProps {
    fields: FieldsInterface;
}

const FormView = ({ fields }: FormViewProps) => {
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

export default FormView;
export { FormViewProps };
