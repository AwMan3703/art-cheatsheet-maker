
const itemIconPath = `assets/icons/`
const itemIconMap = {
    // type : "path/to/icon.png"
    [csItemTypes.date] : `${itemIconPath}clock.png`,
    [csItemTypes.location] : `${itemIconPath}location.png`,
    [csItemTypes.commission] : `${itemIconPath}king.png`,
    [csItemTypes.history] : `${itemIconPath}history.png`,
    [csItemTypes.size] : `${itemIconPath}ruler.png`,
    [csItemTypes.description] : `${itemIconPath}text.png`,
    [csItemTypes.style] : `${itemIconPath}brush.png`,
    [csItemTypes.colors] : `${itemIconPath}palette.png`,
    [csItemTypes.light] : `${itemIconPath}sun.png`,
    [csItemTypes.hypothesis] : `${itemIconPath}question_mark.png`,
    [csItemTypes.documents] : `${itemIconPath}sheet.png`,
    [csItemTypes.texts] : `${itemIconPath}book.png`,
    [csItemTypes[""]] : `${itemIconPath}sparkles.png`
}

function addItem(item, type) {
    const p = document.getElementById(`section-${csItemTypes[type]}`)
    p.appendChild(item)
}

function newItem(type) {
    const content = window.prompt("New item's content:", "no content")
    const icon = document.createElement("img")
    icon.src = itemIconMap[type]
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.innerText = content

    addItem(e, type)
    return e
}
