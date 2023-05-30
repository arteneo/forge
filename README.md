# Future plans

Read more in `Unfinished components`

# Development

1. Install dependencies using `npm install`.
2. Build package using `npm run build`.
3. Update `version` in `package.json`.
4. Commit and push changes.
5. Publish package using `npm publish`.

# Branches

You can use following branches:

1. `main` (default) - branch for current version `3.x`
2. `v2` - branch for version `2.x`
3. `v1` - branch for version `1.x`

# Table functionality

## Toolbar

### Batch actions

You can enable batch select (selectable rows via checkboxes in the table) by passing `enableBatchSelect: true` to `<Table />` component.

There are following components available:

-   `BatchAlertConfirm`: Uses `DialogBatchAlertConfirm` which shows an `Alert` and uses `DialogBatchButtonEndpoint` (single endpoint)
-   `BatchAlertConfirmMulti`: Uses `DialogBatchAlertConfirmMulti` which shows an `Alert` and uses `DialogBatchButtonMultiEndpoint` (multiple endpoints one by one)
-   `BatchConfirm`: Uses `DialogBatchConfirm` which needs children and uses `DialogBatchButtonEndpoint` (single endpoint)
-   `BatchConfirmMulti`: Uses `DialogBatchConfirmMulti` which needs children and uses `DialogBatchButtonMultiEndpoint` (multiple endpoints one by one)
-   `BatchForm`: Uses `DialogBatchFormFieldset` which needs fields (single endpoint)
-   `BatchFormAlert`: Uses `DialogBatchFormAlertFieldset` which shows an `Alert` and needs fields (single endpoint)
-   `BatchFormMulti`: Uses `DialogBatchFormMultiFieldset` which needs fields (multiple endpoints based on form values)
-   `BatchFormMultiAlert`: Uses `DialogBatchFormMultiAlertFieldset` which shows an `Alert` and needs fields (multiple endpoints based on form values)

Example `BatchAlertConfirm` usage.

```js
import React from "react";
import { Optional, BatchAlertConfirm, BatchAlertConfirmProps } from "@arteneo/forge";

type BatchDisableProps = Optional<BatchAlertConfirmProps, "dialogProps">;

const BatchDisable = (props: BatchDisableProps) => {
    return (
        <BatchAlertConfirm
            {...{
                label: "batch.device.disable.action",
                ...props,
                dialogProps: {
                    label: "batch.device.disable.label",
                    ...props.dialogProps,
                    confirmProps: {
                        endpoint: "/device/batch/disable",
                        ...props.dialogProps?.confirmProps,
                    },
                },
            }}
        />
    );
};

export default BatchDisable;
export { BatchDisableProps };
```

Example `BatchAlertConfirmMulti` usage.

```js
import React from "react";
import { Optional, BatchAlertConfirmMulti, BatchAlertConfirmMultiProps } from "@arteneo/forge";

type BatchEnableProps = Optional<BatchAlertConfirmMultiProps, "dialogProps">;

const BatchEnable = (props: BatchEnableProps) => {
    return (
        <BatchAlertConfirmMulti
            {...{
                label: "batch.device.enable.action",
                ...props,
                dialogProps: {
                    label: "batch.device.enable.label",
                    ...props.dialogProps,
                    confirmProps: {
                        endpoint: (result) => "/device/" + result.id + "/enable",
                        resultDenyKey: "enable",
                        ...props.dialogProps?.confirmProps,
                    },
                },
            }}
        />
    );
};

export default BatchEnable;
export { BatchEnableProps };
```

Example `BatchFormAlert` usage.

```js
import React from "react";
import { Optional, BatchFormAlert, BatchFormAlertProps, Text } from "@arteneo/forge";

type BatchVariableAddProps = Optional<BatchFormAlertProps, "dialogProps">;

const BatchVariableAdd = (props: BatchVariableAddProps) => {
    return (
        <BatchFormAlert
            {...{
                label: "batch.device.variableAdd.action",
                ...props,
                dialogProps: {
                    title: "batch.device.variableAdd.title",
                    label: "batch.device.variableAdd.label",
                    formProps: {
                        fields: {
                            name: <Text {...{ required: true }} />,
                        },
                        endpoint: "/device/batch/variable/add",
                    },
                    ...props.dialogProps,
                },
            }}
        />
    );
};

export default BatchVariableAdd;
export { BatchVariableAddProps };
```

Example `BatchFormMultiAlert` usage.

```js
import React from "react";
import { Optional, BatchFormMultiAlert, BatchFormMultiAlertProps, Text } from "@arteneo/forge";

type BatchTemplateApplyProps = Optional<BatchFormMultiAlertProps, "dialogProps">;

const BatchTemplateApply = (props: BatchTemplateApplyProps) => {
    return (
        <BatchFormMultiAlert
            {...{
                label: "batch.device.templateApply.action",
                ...props,
                dialogProps: {
                    title: "batch.device.templateApply.title",
                    label: "batch.device.templateApply.label",
                    formProps: {
                        resultDenyKey: "templateApply",
                        fields: {
                            name: <Text {...{ required: true }} />,
                        },
                        endpoint: (result) => "/device/" + result.id + "/template/apply",
                    },
                    ...props.dialogProps,
                },
            }}
        />
    );
};

export default BatchTemplateApply;
export { BatchTemplateApplyProps };
```

# Dialogs component overview

DialogProvider -> Utility context with initialization. Presenting children inside of a Dialog

Dialog -> Basic Dialog content setup: Title, Content, Actions
DialogTitle -> Presentation component. Needs title (can be resolved using payload)
DialogContent -> Presentation component. Shows loader when initializing otherwise children. Needs children (can be resolved using payload)
DialogContentLoader -> Presentation component. Presents loader
DialogActions -> Presentation component. Shows close button on the left and any passed actions buttons on the right (optionally resolved using payload)

DialogAlert -> Extends Dialog. Presents Alert (needs label which can be optionally resolved using payload)
DialogAlertConfirm -> Adds DialogButtonEndpoint in actions to DialogAlert
DialogConfirm -> Dialog with action button endpoint action (needs children)

DialogBatch -> Basic DialogBatch content setup: Title, DialogBatchContent, Actions
DialogBatchContent -> Presentation component. Shows loader when initializing otherwise children and below DialogBatchProgress and DialogBatchResults. Needs children (can be resolved using payload)
DialogBatchProgress -> Presentation component. Shows linear progress based on processed number of batchResults.
DialogBatchResults -> Presentation component. Shows batchResults with status as rows.

DialogBatchAlert -> Extends DialogBatch. Presents Alert (needs label which can be optionally resolved using payload)
DialogBatchConfirm -> DialogBatch with action DialogBatchButtonEndpoint action (needs children)
DialogBatchAlertConfirm -> Adds DialogBatchButtonEndpoint in actions to DialogBatchAlert
DialogBatchConfirmMulti -> DialogBatch with action DialogButtonMultiEndpoint action (needs children)
DialogBatchAlertConfirmMulti -> Adds DialogButtonMultiEndpoint in actions to DialogBatchAlert

DialogButtonClose -> Overrides default onClick and adds onClose as parameter
DialogButtonSubmit -> Adds default type: "submit" and loading and disabled states
DialogButtonEndpoint -> Adjusts ButtonEndpoint (single endpoint) to Dialog by incorporating onClose to onSuccess and onCatch. Adds disable while initializing
DialogBatchButtonMultiEndpoint -> Adjusts ButtonMultiEndpoint (multiple endpoints one by one) to DialogBatch by managing processing, finished and batchResults states through onStart, onFinish, onSuccess and onCatch. Adds disable while initializing or not finished.
DialogBatchButtonEndpoint -> Adjusts DialogButtonEndpoint (single endpoint) to DialogBatch. It assumes that endpoint will return multiple batchResults in response.

DialogBatchForm -> Basic batch form in dialog component (sends endpoint and assumes that it will return multiple batchResults in response). Adds DialogButtonSubmit. (needs children which should include fields)
DialogBatchFormFieldset -> Extends DialogBatchForm. Presents fields in a specific way. (does not need children)
DialogBatchFormAlertFieldset -> Extends DialogBatchForm. Presents alert and fields in a specific way. (does not need children)

DialogBatchFormMulti -> Basic batch form multi in dialog component (multiple endpoints based on form values). Adds DialogButtonSubmit. (needs children which should include fields)
DialogBatchFormMultiFieldset -> Extends DialogBatchFormMulti. Presents fields in a specific way. (does not need children)
DialogBatchFormMultiAlertFieldset -> Extends DialogBatchFormMulti. Presents alert and fields in a specific way. (does not need children)

DialogForm -> Basic form in dialog component. Adds DialogButtonSubmit. (needs children which should include fields)
DialogFormFieldset -> Extends DialogForm. Presents fields in a specific way. (does not need children)
