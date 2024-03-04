
// Run this script on document load - also holds global variables

let CONFIG = {}

function startup(configData) {
    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
    const contentBody = document.getElementById("content-body")
    addItemSections(contentBody)
    const imageCarousels = document.getElementsByClassName("imageCarousel-wrapper")
    forAllElements(imageCarousels, addImageCarouselOptions)

    CONFIG = configData
}

console.log("Fetching config data...")
fetchjson("../config.json", startup)
