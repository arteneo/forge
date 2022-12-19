import React from "react";
import ButtonDialogBatchConfirm, {
    ButtonDialogBatchConfirmProps,
} from "../../../components/Common/ButtonDialogBatchConfirm";

interface BatchConfirmProps extends ButtonDialogBatchConfirmProps {}

const BatchConfirm = (props: BatchConfirmProps) => {
    return <ButtonDialogBatchConfirm {...props} />;
};

export default BatchConfirm;
export { BatchConfirmProps };

// TODO
// import React from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { useTable } from "../../../components/Table/contexts/Table";
// import Button, { ButtonProps } from "../../../components/Common/Button";
// import { useSnackbar } from "../../../contexts/Snackbar";
// import { useHandleCatch } from "../../../contexts/HandleCatch";
// import { useLoader } from "../../../contexts/Loader";
// import { resolveStringOrFunction } from "../../../utilities/resolve";
// import ResultInterface from "../../../components/Table/definitions/ResultInterface";

// interface BatchProps extends ButtonProps {
//     confirmationLabel?: string;
//     confirmationContent?: React.ReactNode;
//     snackbarLabel: string;
//     endpoint: string;
//     resultRepresentation?: (result: ResultInterface) => React.ReactNode;
// }

// const Batch = ({
//     label,
//     confirmationLabel,
//     confirmationContent,
//     snackbarLabel,
//     endpoint,
//     resultRepresentation = (result: ResultInterface) => result.representation,
//     ...props
// }: BatchProps) => {
//     const { t } = useTranslation();
//     const { results, selected, reload, batchQuery } = useTable();
//     const { showSuccess } = useSnackbar();
//     const handleCatch = useHandleCatch();
//     const { showLoader } = useLoader();
//     const [showConfirmation, setShowConfirmation] = React.useState(false);

//     const batchAction = (): void => {
//         showLoader();

//         axios
//             .post(endpoint, batchQuery)
//             .then(() => {
//                 showSuccess(snackbarLabel);

//                 setShowConfirmation(false);

//                 reload();
//             })
//             .catch((error) => handleCatch(error));
//     };

//     const resolvedLabel = label ? resolveStringOrFunction(label, selected.length) : undefined;

//     if (typeof confirmationContent === "undefined") {
//         if (typeof confirmationLabel === "undefined") {
//             throw new Error("Bath component: Please provide confirmationContent or confirmationLabel prop");
//         }

//         confirmationContent = (
//             <>
//                 <Alert severity="error">{t(confirmationLabel)}</Alert>
//                 <ul>
//                     {results
//                         .filter((result) => selected.includes(result.id))
//                         .map((result, key) => (
//                             <li key={key}>{resultRepresentation(result)}</li>
//                         ))}
//                 </ul>
//             </>
//         );
//     }

//     return (
//         <>
//             <Button
//                 {...{
//                     onClick: () => setShowConfirmation(true),
//                     label: resolvedLabel,
//                     labelVariables: {
//                         count: selected.length,
//                     },
//                     disabled: selected.length === 0,
//                     color: "primary",
//                     variant: "contained",
//                     ...props,
//                 }}
//             />

//             <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} fullWidth maxWidth="sm">
//                 <DialogTitle>{t("crud.confirmation.title")}</DialogTitle>
//                 <DialogContent>{confirmationContent}</DialogContent>
//                 <DialogActions>
//                     <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
//                         <Button onClick={() => setShowConfirmation(false)} variant="contained">
//                             {t("action.cancel")}
//                         </Button>
//                         <Button
//                             {...{
//                                 onClick: () => batchAction(),
//                                 label: resolvedLabel,
//                                 labelVariables: {
//                                     count: selected.length,
//                                 },
//                                 color: "primary",
//                                 variant: "contained",
//                                 ...props,
//                             }}
//                         />
//                     </Box>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default Batch;
// export { BatchProps };
