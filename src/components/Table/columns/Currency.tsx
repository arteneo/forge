import React from "react";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormattedNumber } from "react-intl";

interface Props {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    // eslint-disable-next-line
    currency?: string | ((result: any) => string);
    disableSorting?: boolean;
}

const Currency: React.FC<Props> = ({ result, field, currency = "pln" }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    const value = result[field];

    if (typeof value !== "number") {
        return null;
    }

    const resolvedCurrency = resolveStringOrFunction(currency, result);

    return <FormattedNumber value={value / 100} style="currency" currency={resolvedCurrency} />;
};

export default Currency;
