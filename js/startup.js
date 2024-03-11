
// Run this script on document load - also holds global variables

let CONFIG = {}

function checkConfig(data) {
    // Warn if the config is empty
    if (Object.keys(data).length===0)
        console.warn(`Config seems to be empty (loading: ${JSON.stringify(data)}). If this is intended, you can ignore this message.`);

    // Disable development mode if not on localhost and not explicitly enabled on other domains
    if (window.location.hostname!=="localhost" && !data.client.developmentModeOutsideLocalhost) {
        data.client.developmentMode = false
        console.warn("Development mode was attempted outside of localhost and was disabled automatically. " +
            "To ignore domain and keep it enabled, set [client.developmentModeOutsideLocalhost] to true in config.json")}

    return data
}
function startup(configData) {
    console.log("Checking config data...")
    CONFIG = checkConfig(configData)
    console.log("Config data loaded")

    if (CONFIG.client.developmentMode) console.info("Debug mode is enabled")

    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
    const contentBody = document.getElementById("content-body")
    addItemSections(contentBody)
    const imageCarousels = document.getElementsByClassName("imageCarousel-wrapper")
    forAllElements(imageCarousels, addImageCarouselOptions)
    const versionLabel = document.querySelector("#version.client-info")
    versionLabel.innerText = `v${CONFIG.client.version}${CONFIG.client.developmentMode ? "dev" : null}`

    window.onbeforeunload = CONFIG.client.developmentMode ? null : (ev) => { return true }
}

console.log("Fetching config data...")
const configPath = "" // Path to config from index.html's path
// Get the current path, cut out the file name and replace it with config.json
const configURL = window.location.href.substring(0,window.location.href.indexOf("index.html")) + configPath + "config.json"
fetchjson(configURL, startup)
