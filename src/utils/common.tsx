/* eslint-disable */
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import { FormikValues, setIn, getIn } from "formik";

const populate = (fields: FieldsInterface, ...objects: FormikValues[]): FormikValues => {
    if (objects.length === 0) {
        return {};
    }

    let populatedObject: FormikValues = {};

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        const fieldFields = field?.props?.fields;

        if (fieldFields) {
            // This field has it own fields definition (Collection)
            // Prepare fieldObjects variable which has only values for this field. Not existing objects are removed
            const fieldObjects = objects.map((object) => object[fieldName] || null).filter((object) => object !== null);
            if (fieldObjects.length > 0) {
                populatedObject[fieldName] = populate(fieldFields, ...fieldObjects);
            }

            return;
        }

        objects.forEach((object) => {
            const path = field?.props?.path ? field.props.path : fieldName;
            const initialValue = getIn(object, path, undefined);

            if (Array.isArray(object)) {
                // TODO This works but does not make sense for many objects. Should be reworked
                populatedObject = object.map((objectValue) => populate(fields, objectValue));
            } else if (typeof initialValue !== "undefined") {
                // This badly designed solution, but makes life much easier. Better solution kindly requested
                const transformInitialValue = field?.props?.transformInitialValue;
                if (transformInitialValue) {
                    populatedObject = setIn(populatedObject, path, transformInitialValue(initialValue));
                    return;
                }

                populatedObject = setIn(populatedObject, path, initialValue);
            }
        });
    });

    return populatedObject;
};

export { populate };
