const dialogParent = document.getElementById("dialog-screen-darkener")

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
            title: title ? title : "Confermare?",
            description: description,
            options: {
                completeDialog: {
                    label: "Conferma",
                    callback: callbackYes ? callbackYes : () => {}
                },
                abortDialog: {
                    label: "Annulla",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}

const textInputDialog = (callbackYes, callbackNo, title, label, yesLabel) => {
    Dialog(dialogParent,
        {
            title: title ? title : "Input di testo",
            inputs: {
                [label]: {
                    type: "textarea"
                }
            },
            options: {
                completeDialog: {
                    label: yesLabel ? yesLabel : "Conferma",
                    callback: (data) => {
                        const t = data[label].value
                        callbackYes(t)
                    }
                },
                abortDialog: {
                    label: "Annulla",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}

const editItemDialog = (item, callbackYes, callbackNo, title) => {
    Dialog(dialogParent,
        {
            title: title ? title : `Modifica ${item.parentNode.id}`,
            description: "Modifica il testo, quindi clicca \"Salva\" per applicare i cambiamenti.",
            inputs: {
                "modifica contenuto:": {
                    type: "textarea",
                    defaultValue: item.innerText
                }
            },
            options: {
                completeDialog: {
                    label: "Salva",
                    callback: (data) => {
                        const nt = data["modifica contenuto:"].value
                        callbackYes(nt)
                    }
                },
                abortDialog: {
                    label: "Annulla",
                    callback: callbackNo ? callbackNo : () => {}
                }
            }
        }
    )
}
