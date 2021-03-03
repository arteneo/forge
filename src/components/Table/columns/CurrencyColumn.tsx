import React from "react";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormattedNumber } from "react-intl";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";
import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";

interface CurrencyColumnProps extends TableColumnPathType {
    // eslint-disable-next-line
    currency?: string | ((result: ResultInterface) => string);
}

const CurrencyColumn = ({ result, field, path, currency = "pln" }: CurrencyColumnProps) => {
    if (typeof field === "undefined") {
        throw new Error("CurrencyColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("CurrencyColumn component: Missing required result prop");
    }

    const value = getIn(result, path ? path : field);

    if (typeof value !== "number") {
        return null;
    }

    const resolvedCurrency = resolveStringOrFunction(currency, result);

    return <FormattedNumber value={value / 100} style="currency" currency={resolvedCurrency} />;
};

export default CurrencyColumn;
export { CurrencyColumnProps };
