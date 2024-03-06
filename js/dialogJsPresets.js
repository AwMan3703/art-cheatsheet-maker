
// Shorthands for generating dialogs
const alertDialog = (title, description) => {
    Dialog(dialogParent,
        {
            title: title,
            description: description,
            options: {
                abortDialog: {
                    label: "Okay",
                    callback: () => {}
                }
            }
        }
    )
}

const yesNoDialog = (callbackYes, callbackNo, title, description) => {
    Dialog(dialogParent,
        {
            title: title ? title : "Confirm?",
            description: description,
            options: {
                completeDialog: {
                    label: "Confirm",
                    callback: callbackYes ? callbackYes : () => {}
                },
                abortDialog: {
                    label: "Cancel",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}

const textInputDialog = (callbackYes, callbackNo, title, label, yesLabel) => {
    Dialog(dialogParent,
        {
            title: title ? title : "Text input",
            inputs: {
                [label]: {
                    type: "text"
                }
            },
            options: {
                completeDialog: {
                    label: yesLabel ? yesLabel : "Confirm",
                    callback: (data) => {
                        const t = data[label].value
                        callbackYes(t)
                    }
                },
                abortDialog: {
                    label: "Cancel",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}

const editItemDialog = (item, callbackYes, callbackNo, title) => {
    Dialog(dialogParent,
        {
            title: !isEmptyString(title) ? title : `edit ${item.parentNode.id}`,
            description: "Edit the text, then hit \"Save\" to complete.",
            inputs: {
                "edit content:": {
                    type: "text",
                    defaultValue: item.innerText
                }
            },
            options: {
                completeDialog: {
                    label: "Save",
                    callback: (data) => {
                        const nt = data["edit content:"].value
                        callbackYes(nt)
                    }
                },
                abortDialog: {
                    label: "Cancel",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}
