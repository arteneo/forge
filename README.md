# Future plans

Read more in `Unfinished components`

# Development

1. Install dependencies using `npm install`.
2. Build package using `npm run build`.
3. Update `version` in `package.json`.
4. Commit and push changes.
5. Publish package using `npm publish`.

# Dialogs

DialogProvider -> Utility context with initialization. Presenting children as insides of a Dialog
Dialog -> Basic Dialog content setup: Title, Content, Actions
DialogTitle -> Presentation component. Needs title (optionally resolved using payload)
DialogContent -> Presentation component. Shows loader when initializing otherwise children. Needs children (optionally resolved using payload)
DialogContentLoader -> Presentation component. Presents loader
DialogActions -> Presentation component. Shows close button on the left and any passed actions buttons on the right (optionally resolved using payload)

DialogAlert -> Presentation component similar to Dialog. Presents Alert (needs label which can be optionally resolved using payload)
DialogButtonEndpoint -> Adjusts ButtonEndpoint to Dialog by incorporating onClose and disable while initializing

DialogConfirm -> Dialog with action button endpoint action (needs children)
DialogAlertConfirm -> Dialog with action button endpoint action that presents Alert (needs label)

TODO DialogForm
