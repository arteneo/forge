# Unfinished components

-   ResultIconButton
-   ResultIconButtonDialog
-   ResultIconButtonDownload
-   ResultIconButtonEndpoint
-   ResultIconButtonEndpointDialogConfirm
-   ResultIconButtonLink

# ResultButtonDialogForm

Please prepare your own component and use `ButtonDialogForm` directly. There seems to be too much complexity for `formProps` resolution based on `result`.

Find example in `IconResultButtonDialogForm` section.

# IconResultButtonDialogForm

Please prepare your own component and use `IconButtonDialogForm` directly. There seems to be too much complexity for `formProps` resolution based on `result`.

Example:

```ts
import React from "react";
import { Edit } from "@mui/icons-material";
import {
    IconButtonDialogForm,
    ColumnActionInterface,
    transformInitialValues,
    filterInitialValues,
} from "@arteneo/forge";
import getFields from "~app/entities/Order/fields";
import OrderDialogForm from "~app/dialogs/OrderDialogForm";
import auth from "~app/utilities/auth";

type OrderEditProps = ColumnActionInterface;

const OrderEdit = ({ result }: OrderEditProps) => {
    if (typeof result === "undefined") {
        throw new Error("OrderEdit component: Missing required result prop");
    }

    const fields = getFields();

    return (
        <IconButtonDialogForm
            {...{
                icon: <Edit />,
                tooltip: "action.edit",
                color: "primary",
                renderDialog: (params) => <OrderDialogForm {...params} />,
                formProps: {
                    initializeEndpoint: {
                        url: auth.getApiPrefix() + "/order/" + result?.id,
                        method: "post",
                    },
                    processInitialValues: (fields, initialValues, response) =>
                        transformInitialValues(
                            fields,
                            filterInitialValues(fields, initialValues, response?.data?.data)
                        ),
                    endpoint: auth.getApiPrefix() + "/order/save",
                    fields,
                },
            }}
        />
    );
};

export default OrderEdit;
export { OrderEditProps };
```
