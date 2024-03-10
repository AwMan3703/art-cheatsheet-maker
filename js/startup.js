
// Run this script on document load - also holds global variables

let CONFIG = {}

function checkConfig(data) {
    if (Object.keys(data).length===0) console.warn(`Config seems to be empty (${JSON.stringify(data)}). If this is intended, you can ignore this message.`); return false;
}
function startup(configData) {
    CONFIG = configData
    console.log("Config data loaded")
    checkConfig(CONFIG)

    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
    const contentBody = document.getElementById("content-body")
    addItemSections(contentBody)
    const imageCarousels = document.getElementsByClassName("imageCarousel-wrapper")
    forAllElements(imageCarousels, addImageCarouselOptions)
}

console.log("Fetching config data...")
const configPath = "" // Path to config from index.html's path
// Get the current path, cut out the file name and replace it with config.json
const configURL = window.location.href.substring(0,window.location.href.indexOf("index.html")) + configPath + "config.json"
fetchjson(configURL, startup)
