
function addItem(type) {
    textInputDialog((text) => {
        if (!isEmptyString(text)) appendItem(type, text)
    }, null, `${type.emoji} Aggiungi ${type.names.singular}`, "contenuto:", "Aggiungi")
}

function addItemGenerationButtons(types) {
    const parent = document.getElementById("add-element-panel")
    parent.querySelectorAll('*').forEach(cn => cn.remove())

    types.forEach(type => {
        type = CONFIG.sheet.items.types[type]
        const e = document.createElement("button")
        e.ontouchend = e.onclick = _ => { addItem(type) }
        e.className = "item-gen-button"
        e.innerText = `${type.emoji} ${capitalize(type.names.singular)}`
        parent.appendChild(e)
    })
}

function addSubjectSelectionOptions(subjects) {
    const parent = document.getElementById('csSUBJECT-selector')
    parent.childNodes.forEach(cn => cn.remove())

    subjects.forEach(subjectName => {
        const subject = CONFIG.subjects[subjectName]
        const e = document.createElement('option')
        e.value = subjectName
        e.innerText = subject.name
        parent.appendChild(e)
    })
}


document.getElementById('csSUBJECT-selector').onchange = ev => {
    CONFIG.sheet.currentSubject = ev.currentTarget.value
    addItemGenerationButtons(CONFIG.subjects[CONFIG.sheet.currentSubject].item_types)
}