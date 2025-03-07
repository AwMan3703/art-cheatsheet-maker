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
                    type: "textarea",
                    attributes: { "style" : "width:60vw;height:20vh" }
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
                    attributes: { "style" : "width:60vw;height:20vh" },
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

const colorSelectDialog = (callback, title, colors) => {
    let html = "<ul class='cs-item-color-selector-list'>"
    for (const [name, code] of Object.entries(colors)) {
        const id = crypto.randomUUID()
        html += `<li class="cs-item-color-selector-item" style="background-color: ${code};">
                    <input type="radio" name="color-selector-option" class="cs-item-color-selector-item-input" id="${id}" value="${code}">
                    <label for="${id}" class="cs-item-color-selector-item-label" data-color-value="${code}">${name}</label></li>`
    }
    html += "</ul>"
    Dialog(dialogParent,
        {
            title: title ? title : "Scegli un colore",
            inputs: {
                "scegli un colore:": {
                    type: html,
                    raw: true
                }
            },
            options: {
                completeDialog: {
                    label: "Salva",
                    callback: (data) => {
                        const c = dialogParent.querySelector('input[type="radio"]:checked').value
                        callback(c)
                    }
                },
                abortDialog: {
                    label: "Annulla",
                    callback: () => {}
                }
            }
        }
    )
}
