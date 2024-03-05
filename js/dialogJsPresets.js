
// Shorthands for generating dialogs
const editDialog = (element) => {
    Dialog(dialogParent,
        {
            title : `edit ${element.id}`,
            description : "Edit the text, then hit \"Save\" to write the changes you made",
            inputs : {
                "text-input" : {
                    type : "text",
                    defaultValue : element.innerText
                }
            },
            options : {
                completeDialog : {
                    label : "Save",
                    callback : (data) => {
                        const nt = data["text-input"].value
                        if (nt==null || nt.trim()==="") { return }
                        element.innerText = nt
                    }
                },
                abortDialog : {
                    label : "Cancel",
                    callback : () => {}
                }
            }
        }
    )
}

// TODO : swap out all window.prompt's for modular dialogs