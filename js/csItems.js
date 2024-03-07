
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
    architecture: "csItemType:ARCHITECTURE",
    "" : "csItemType:EMPTY-STRING"
}

const csItemIconMap = {
    // type : "path/to/icon.png"
    [csItemTypes.commission] : `assets/king.png`,
    [csItemTypes.history] : `assets/history.png`,
    [csItemTypes.size] : `assets/ruler.png`,
    [csItemTypes.description] : `assets/text.png`,
    [csItemTypes.style] : `assets/shapes.png`,
    [csItemTypes.colors] : `assets/palette.png`,
    [csItemTypes.light] : `assets/sun.png`,
    [csItemTypes.hypothesis] : `assets/question-mark.png`,
    [csItemTypes.documents] : `assets/sheet.png`,
    [csItemTypes.texts] : `assets/book.png`,
    [csItemTypes.architecture] : `assets/temple.png`
}
