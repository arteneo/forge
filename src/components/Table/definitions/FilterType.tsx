type FilterType =
    | "like"
    | "equal"
    | "equalMultiple"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "dateGreaterThan"
    | "dateGreaterThanOrEqual"
    | "dateLessThan"
    | "dateLessThanOrEqual"
    | "dateTimeGreaterThan"
    | "dateTimeGreaterThanOrEqual"
    | "dateTimeLessThan"
    | "dateTimeLessThanOrEqual"
    | "timeGreaterThan"
    | "timeGreaterThanOrEqual"
    | "timeLessThan"
    | "timeLessThanOrEqual";

export default FilterType;
