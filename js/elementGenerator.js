
const csItemIconPath = `assets/icons/`
const csItemIconMap = {
    // type : "path/to/icon.png"
    [csItemTypes.date] : `${csItemIconPath}clock.png`,
    [csItemTypes.location] : `${csItemIconPath}location.png`,
    [csItemTypes.commission] : `${csItemIconPath}king.png`,
    [csItemTypes.history] : `${csItemIconPath}history.png`,
    [csItemTypes.size] : `${csItemIconPath}ruler.png`,
    [csItemTypes.description] : `${csItemIconPath}text.png`,
    [csItemTypes.style] : `${csItemIconPath}brush.png`,
    [csItemTypes.colors] : `${csItemIconPath}palette.png`,
    [csItemTypes.light] : `${csItemIconPath}sun.png`,
    [csItemTypes.hypothesis] : `${csItemIconPath}question_mark.png`,
    [csItemTypes.documents] : `${csItemIconPath}sheet.png`,
    [csItemTypes.texts] : `${csItemIconPath}book.png`,
    [csItemTypes[""]] : `${csItemIconPath}sparkles.png`
}



function addItem(item, type) {
    const p = document.getElementById(`section-${csItemTypes[type]}`)
    p.appendChild(item)
}

function newItem(type) {
    const content = window.prompt("New item's content:", "no content")
    const icon = document.createElement("img")
    icon.src = csItemIconMap[type]
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.innerText = content

    addItem(e, type)
    return e
}
