
// Run this script on document load

function addItemGenerationButtons(parent) {
    Object.keys(csItemTypes).forEach((key) => {
        const type = csItemTypes[key]
        const e = document.createElement("button")
        e.onclick = `newItem(${type})`
        parent.appendChild()
    })
}






function startup() {
    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
}

startup()
