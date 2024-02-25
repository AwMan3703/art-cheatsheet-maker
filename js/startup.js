
// Run this script on document load

function addItemGenerationButtons(parent) {
    const exclude = [""]
    Object.keys(csItemTypes).forEach((key) => {
        if (exclude.includes(key)) {return}
        const type = csItemTypes[key]
        const e = document.createElement("button")
        e.setAttribute("onclick", `newItem("${key}")`)
        e.className = "item-gen-button"
        e.innerText = `+ ${key}`
        parent.appendChild(e)
    })
}

function addItemSections(parent) {
    const exclude = [""]
    Object.keys(csItemTypes).forEach((key) => {
        if (exclude.includes(key)) {return}
        const type = csItemTypes[key]
        const e = document.createElement("section")
        e.className = "cs-section"
        e.id = `section-${type}`

        const header = document.createElement("div")
        header.className = "cs-section-header"
        const icon = document.createElement("img")
        icon.src = `${csItemIconMap[type]}`
        header.appendChild(icon)
        const title = document.createElement("h3")
        title.innerText = `${key}`
        header.appendChild(title)

        e.appendChild(header)
        parent.appendChild(e)
    })
}






function startup() {
    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
    const contentBody = document.getElementById("content-body")
    addItemSections(contentBody)
}

startup()
