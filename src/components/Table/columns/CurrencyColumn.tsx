import React from "react";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormattedNumber } from "react-intl";
import { getIn } from "formik";
import ColumnPathInterface from "@arteneo/forge/components/Table/definitions/ColumnPathInterface";

interface CurrencyColumnProps extends ColumnPathInterface {
    // eslint-disable-next-line
    currency?: string | ((result: any) => string);
}

const CurrencyColumn = ({ result, field, path, currency = "pln" }: CurrencyColumnProps) => {
    if (typeof field === "undefined") {
        return null;
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
