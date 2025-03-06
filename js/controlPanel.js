
function addItem(type) {
    const itemType = CONFIG.sheet.items.types[type]
    textInputDialog((text) => {
        if (!isEmptyString(text)) appendItem(type, text)
    }, null, `${itemType.emoji} Aggiungi ${itemType.names.singular}`, "contenuto:", "Aggiungi")
}

const keyBindKeys = ['1','2','3','4','5','6','7','8','9','0',
    'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']
const keyBindListeners = []
function addItemGenerationButtons(types) {
    const parent = document.getElementById("add-element-panel")
    parent.querySelectorAll('*').forEach(cn => cn.remove())
    keyBindListeners.forEach(kbl => document.body.removeEventListener("keyup", kbl))

    let counter =  0
    types.forEach(type => {
        const itemType = CONFIG.sheet.items.types[type]
        const e = document.createElement("button")
        e.ontouchend = e.onclick = _ => { addItem(type) }

        e.dataset.keybind = keyBindKeys[counter]
        const keyBindCallback = ev => { if (ev.key === e.dataset.keybind) addItem(type) }
        document.body.addEventListener("keyup", keyBindCallback)
        keyBindListeners.push(keyBindCallback)

        e.className = "item-gen-button"
        e.innerText = `${itemType.emoji} ${capitalize(itemType.names.singular)}`
        parent.appendChild(e)

        counter += 1
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

function updateMainDataSection(subject) {
    const mainDataSection = document.getElementById('main-data')
    const targets = mainDataSection.children

    for (const e of targets) {
        if (e.dataset.subjects.split(' ').includes(subject)) e.style.removeProperty('display')
        else e.style.display = 'none'
    }
}


document.getElementById('csSUBJECT-selector').onchange = ev => {
    CONFIG.sheet.currentSubject = ev.currentTarget.value
    addItemGenerationButtons(CONFIG.subjects[CONFIG.sheet.currentSubject].item_types)
    updateMainDataSection(CONFIG.sheet.currentSubject)
}