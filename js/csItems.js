
// Available item types

const csItemTypes= {
    // type : "identifier:name"
    commission : "csItemType:COMMISSION",
    history : "csItemType:HISTORY",
    size : "csItemType:SIZE",
    description : "csItemType:DESCRIPTION",
    style : "csItemType:STYLE",
    colors : "csItemType:COLORS",
    light : "csItemType:LIGHT",
    hypothesis : "csItemType:HYPOTHESIS",
    documents : "csItemType:DOCUMENTS",
    texts : "csItemType:TEXTS",
    "" : "csItemType:EMPTY-STRING"
}

const csItemIconPath = `assets/icons/`
const csItemIconMap = {
    // type : "path/to/icon.png"
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
