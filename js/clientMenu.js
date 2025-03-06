
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

/**
 * Sets up an element to be a client option boolean toggle button.
 * @param element The element to work on.
 * @param state_getter A function that can determine what state the option is currently in (must return a boolean value).
 * @param callback The callback to be run when the button is clicked — a boolean parameter will be passed before the event
 * object, representing the NEW state of the client option (e.g. if the option is currently disabled, this callback will
 * receive  a TRUE value (and then the event Object), because the option is being enabled).
 */
function makeClientBooleanOptionButton(element, state_getter, callback) {
    element.addEventListener('click', ev => {
        const new_state = !state_getter()
        callback(new_state, ev)

        element.classList.toggle('setting-bool-active', new_state)
    })
}


// CLIENT OPTIONS
const saveLocalConfigButton = document.getElementById('client-option-saveLocalConfig')
const toggleDynamicBackgroundsButton = document.getElementById('client-option-toggleDynamicBackgrounds')
const saveCurrentSubjectButton = document.getElementById('client-option-saveCurrentSubject')

makeClientBooleanOptionButton(saveLocalConfigButton,
    _ => CONFIG.client.saveLocalConfig,
    is_active => {CONFIG.client.saveLocalConfig = is_active})
makeClientBooleanOptionButton(toggleDynamicBackgroundsButton,
    _ => CONFIG.sheet.editing.enableDynamicBackgrounds,
    is_active => {CONFIG.sheet.editing.enableDynamicBackgrounds = is_active
    document.getElementById('content-body').classList.toggle('dynamic-backgrounds-enabled', is_active)})
makeClientBooleanOptionButton(saveCurrentSubjectButton,
    _ => CONFIG.sheet.editing.saveCurrentSubject,
    is_active => {CONFIG.sheet.editing.saveCurrentSubject = is_active})

// CLIENT DEBUG OPTIONS
const configResetButton = document.getElementById('client-option-debug-resetConfig')
const toggleScreenshotModeButton = document.getElementById('client-option-debug-toggleScreenshotMode')

configResetButton.addEventListener('click', _ => {
    let csTitle = document.getElementById('main-title').value
    csTitle = isEmptyString(csTitle) ? null : csTitle
    const confirmation = window.confirm(`Saranno perse tutte le impostazioni${csTitle ? ` e la scheda attuale ("${csTitle}")` : ''}. 
    Ripristinare la configurazione come da server?`)
    if (!confirmation) return
    CONFIG.client.saveLocalConfig = false
    window.location.reload()
})
makeClientBooleanOptionButton(toggleScreenshotModeButton,
    _ => {return document.body.classList.contains('during-screenshot')},
    is_active => {document.body.classList.toggle('during-screenshot', is_active)})