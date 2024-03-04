
function addItemGenerationButtons(parent) {
    const exclude = [""]
    Object.keys(csItemTypes).forEach((key) => {
        if (exclude.includes(key)) { return }
        const type = csItemTypes[key]
        const e = document.createElement("button")
        e.setAttribute("onclick", `addItem("${key}")`)
        e.className = "item-gen-button"
        e.innerText = `+ ${capitalize(key)}`
        parent.appendChild(e)
    })
}
