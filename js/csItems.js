
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

const csItemIconMap = {
    // type : "path/to/icon.png"
    [csItemTypes.location] : `assets/location.png`,
    [csItemTypes.commission] : `assets/king.png`,
    [csItemTypes.history] : `assets/history.png`,
    [csItemTypes.size] : `assets/ruler.png`,
    [csItemTypes.description] : `assets/text.png`,
    [csItemTypes.style] : `assets/style.png`,
    [csItemTypes.colors] : `assets/palette.png`,
    [csItemTypes.light] : `assets/sun.png`,
    [csItemTypes.hypothesis] : `assets/question-mark.png`,
    [csItemTypes.documents] : `assets/sheet.png`,
    [csItemTypes.texts] : `assets/book.png`,
    [csItemTypes[""]] : `assets/sparkles.png`
}
