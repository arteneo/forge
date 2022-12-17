# Future plans

Read more in `Unfinished components`

# Development

1. Install dependencies using `npm install`.
2. Build package using `npm run build`.
3. Update `version` in `package.json`.
4. Commit and push changes.
5. Publish package using `npm publish`.

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

DialogButtonClose -> Overrides default onClick and adds onClose as parameter
DialogButtonEndpoint -> Adjusts ButtonEndpoint to Dialog by incorporating onClose to onSuccess and onCatch. Adds disable while initializing
DialogButtonSubmit -> Adds default type: "submit" and loading and disabled states

DialogForm -> Basic form in dialog component. Adds DialogButtonSubmit. (needs children which should include fields)
DialogFormFieldset -> Extends DialogForm. Presents fields in a specific way. (does not need children)
