import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";

export const getFields = <T,>(names: undefined | T[], fields: FieldsInterface): FieldsInterface => {
    const _fields: FieldsInterface = {};
    const fieldNames = typeof names === "undefined" ? Object.keys(fields) : names;

    fieldNames.forEach((fieldName) => {
        if (typeof fieldName !== "string") {
            throw new Error("Column name " + fieldName + " not supported");
        }
        if (typeof fields[fieldName] === "undefined") {
            throw new Error("Column name " + fieldName + " not supported");
        }

        _fields[fieldName] = fields[fieldName];
    });

    return _fields;
};
