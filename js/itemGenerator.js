
const csIconPath = `assets/icons/`
const csItemIconMap = {
    // type : "path/to/icon.png"
    [csItemTypes.location] : `${csIconPath}location.png`,
    [csItemTypes.commission] : `${csIconPath}king.png`,
    [csItemTypes.history] : `${csIconPath}history.png`,
    [csItemTypes.size] : `${csIconPath}ruler.png`,
    [csItemTypes.description] : `${csIconPath}text.png`,
    [csItemTypes.style] : `${csIconPath}brush.png`,
    [csItemTypes.colors] : `${csIconPath}palette.png`,
    [csItemTypes.light] : `${csIconPath}sun.png`,
    [csItemTypes.hypothesis] : `${csIconPath}question_mark.png`,
    [csItemTypes.documents] : `${csIconPath}sheet.png`,
    [csItemTypes.texts] : `${csIconPath}book.png`,
    [csItemTypes[""]] : `${csIconPath}sparkles.png`
}

function addItem(item, type) {
    const p = document.getElementById(`section-${csItemTypes[type]}`)
    p.appendChild(item)
}

function newItem(type) {
    const content = window.prompt("New item's content:", "no content")
    if (content.trim().length === 0) {return}
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.innerText = content

    const xBtn = document.createElement("button")
    const editBtn = document.createElement("button")

    addItem(e, type)
    return e
}