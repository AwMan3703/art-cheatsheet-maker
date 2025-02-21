
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

const toggleDynamicBackgrounds = (e) => {
    e = document.getElementById(e)
    CONFIG.sheet.editing.enableDynamicBackgrounds = !CONFIG.sheet.editing.enableDynamicBackgrounds

    // Update the UI
    if (CONFIG.sheet.editing.enableDynamicBackgrounds) {
        e.classList.add('setting-bool-active')
        document.getElementById('content-body').classList.add('dynamic-backgrounds-enabled')
    } else {
        e.classList.remove('setting-bool-active')
        document.getElementById('content-body').classList.remove('dynamic-backgrounds-enabled')
    }
}

const toggleSaveSubject = (e) => {
    e = document.getElementById(e)
    CONFIG.sheet.editing.saveCurrentSubject = !CONFIG.sheet.editing.saveCurrentSubject

    // Update the UI
    if (CONFIG.sheet.editing.saveCurrentSubject) e.classList.add('setting-bool-active')
    else e.classList.remove('setting-bool-active')
}