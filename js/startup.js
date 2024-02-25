
// Run this script on document load

function addItemGenerationButtons(parent) {
    Object.keys(csItemTypes).forEach((key) => {
        const type = csItemTypes[key]
        const e = document.createElement("button")
        e.setAttribute("onclick", `newItem("${key}")`)
        e.innerText = `+ ${key}`
        parent.appendChild(e)
    })
}






function startup() {
    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
}

startup()
