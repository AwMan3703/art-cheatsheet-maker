
const iconPath = `assets/icons/`
const iconMap = {
    // type : "path/to/icon.png"
    "date" : `${iconPath}clock.png`,
    "location" : `${iconPath}location.png`,
    "commission" : `${iconPath}king.png`,
    "history" : `${iconPath}history.png`,
    "size" : `${iconPath}ruler.png`,
    "description" : `${iconPath}text.png`,
    "style" : `${iconPath}brush.png`,
    "colors" : `${iconPath}palette.png`,
    "light" : `${iconPath}sun.png`,
    "hypothesis" : `${iconPath}question_mark.png`,
    "documents" : `${iconPath}sheet.png`,
    "texts" : `${iconPath}book.png`,
    "" : `${iconPath}sparkles.png`
}

function addItem(item, type) {
    const p = document.getElementById(`section-${type}`)
    p.appendChild(item)
}

function newItem(type, content) {
    const icon = document.createElement("img")
    icon.src = iconMap[type]
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.innerText = content

    addItem(e, type)
    return e
}
