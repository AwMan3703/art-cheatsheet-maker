
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
    console.info("Config data obtained")
    const localConfig = JSON.parse(localStorage.getItem(configData.client.localConfigKey))
    console.log(`Local config data ${localConfig!=null ? 'detected' : 'not found - loading default'}`)
    if (localConfig!=null && localConfig.client.saveLocalConfig) configData = localConfig
    console.info(`saveLocalConfig is ${configData.client.saveLocalConfig} – ${configData.client.saveLocalConfig ? 'default' : 'if present, local'} config has been discarded`)
    console.log("Checking config data...")
    CONFIG = checkConfig(configData)
    console.info("Config data loaded")

    if (CONFIG.client.developmentMode) console.info("Debug mode is enabled")

    const itemGenerationPanel = document.getElementById("add-element-panel")
    addItemGenerationButtons(itemGenerationPanel)
    const contentBody = document.getElementById("content-body")
    addItemSections(contentBody)
    const imageCarousels = document.getElementsByClassName("imageCarousel-wrapper")
    forAllElements(imageCarousels, addImageCarouselOptions)
    const versionLabel = document.querySelector("#clientInfo-wrapper > #version")
    versionLabel.innerText = `v${CONFIG.client.version}${CONFIG.client.developmentMode ? "dev" : ""}`

        // If local config is enabled, save it – if not, delete any copy that might have been previously saved
        if (CONFIG.client.saveLocalConfig) localStorage.setItem(CONFIG.client.localConfigKey, JSON.stringify(CONFIG))
        else if (localStorage.getItem(CONFIG.client.localConfigKey)!=null) localStorage.removeItem(CONFIG.client.localConfigKey)

        // If debug mode is not enabled, warn about progress loss before leaving the page
        if (!CONFIG.client.developmentMode) return true
    }
}

console.log("Fetching config data...")
const configPath = "" // Path to config from index.html's path
// Get the current path, cut out the file name and replace it with config.json
const configURL = window.location.href.substring(0,window.location.href.indexOf("index.html")) + configPath + "config.json"
fetchjson(configURL, startup)
