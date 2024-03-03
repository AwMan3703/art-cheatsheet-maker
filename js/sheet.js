
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
        icon.className = "icon-mono display-mode-dynamic-icon"
        icon.src = csItemIconMap[type]
        header.appendChild(icon)
        const title = document.createElement("h3")
        title.innerText = `${key}`
        header.appendChild(title)

        e.appendChild(header)
        parent.appendChild(e)
    })
}

function addItem(type) {
    const content = window.prompt("New item's content:", "no content")
    if (content.trim().length === 0) {return}

    const e = document.createElement("div")
    const itemID = `csItem-UUID:${crypto.randomUUID()}`
    e.id = itemID
    e.className = `cs-item item-${type}`

    const paragraph = document.createElement("p")
    paragraph.style.margin = "10px"
    paragraph.innerText = content
    e.appendChild(paragraph)

    const btnWrapper = document.createElement("div")
    const xIcon = document.createElement("img")
    xIcon.className = "icon-mono display-mode-dynamic-icon"
    xIcon.src = "assets/x.png"
    xBtn.appendChild(xIcon)

    btnWrapper.appendChild(editBtn)
    btnWrapper.appendChild(xBtn)
    e.appendChild(btnWrapper)

    const p = document.getElementById(`section-${csItemTypes[type]}`)
    p.appendChild(e)
    return e
}

function addImage(parent, files) {
    const reader = new FileReader()
    for (const i in files) {
        const f = URL.createObjectURL(files[i])
        const img = document.createElement("img")
        img.src = f
        parent.appendChild(img)
    }
}
