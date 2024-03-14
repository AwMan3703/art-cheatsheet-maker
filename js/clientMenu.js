
// update client menu options on load
function updateClientMenuOption(o) {
    let setting = getNestedJSON(CONFIG, o.dataset.setting)
    switch (typeof setting) {
        case "boolean":
            if (setting) o.classList.add('setting-bool-active')
            break
        default:
            break
    }
}

// client menu options callbacks

// local config toggle
const toggleSaveConfig = (e) => {
    e = document.getElementById(e)
    CONFIG.client.saveLocalConfig = !CONFIG.client.saveLocalConfig

    // Update the UI
    if (CONFIG.client.saveLocalConfig) e.classList.add('setting-bool-active')
    else e.classList.remove('setting-bool-active')
}
