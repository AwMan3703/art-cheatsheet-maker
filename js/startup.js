
// Run this script on document load

function addItemGenerationButtons(parent) {
    const exclude = ["", "name", "image"]
    Object.keys(csItemTypes).forEach((key) => {
        if (exclude.includes(key)) {return}
        const type = csItemTypes[key]
        const e = document.createElement("button")
        e.setAttribute("onclick", `newItem("${key}")`)
        e.innerText = `+ ${key}`
        parent.appendChild(e)
    })
}

function addItemSections(parent) {
    const exclude = ["", "name", "author", "image", "date"]
    Object.keys(csItemTypes).forEach((key) => {
        if (exclude.includes(key)) {return}
        const type = csItemTypes[key]
        const e = document.createElement("section")
        e.id = `section-${type}`
        const title = document.createElement("h3")
        title.innerText = `${key}`
        e.appendChild(title)
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
