
function addItem(type) {
    const itemType = CONFIG.sheet.items.types[type]
    textInputDialog((text) => {
        if (!isEmptyString(text)) appendItem(type, text)
    }, null, `${itemType.emoji} Agguingi ${itemType.names.singular}`, "contenuto:", "Aggiungi")
}

function addItemGenerationButtons(parent) {
    const exclude = [""]
    Object.keys(CONFIG.sheet.items.types).forEach((key) => {
        if (exclude.includes(key)) { return }
        const type = CONFIG.sheet.items.types[key]
        const e = document.createElement("button")
        e.onclick = _ => { addItem(key) }
        e.className = "item-gen-button"
        e.innerText = `${type.emoji} ${capitalize(type.names.singular)}`
        parent.appendChild(e)
    })
}
