
function toggleDisplayMode(dm) {
    dm = `displaymode-${dm}`
    const added = document.body.classList.toggle(dm)
    if (added) CONFIG.ui.displayModes.push(dm)
    else try { CONFIG.ui.displayModes = CONFIG.ui.displayModes.filter(v => v !== dm) } catch (e) { console.error(e) }
    return added
}

const subwaysurfers_video = document.getElementById("subway-surfers-video")
subwaysurfers_video.onended = _ => {
    subwaysurfers_video.currentTime = 0
    subwaysurfers_video.play()
}

function toggleSubwaySurfers() {
    const added = toggleDisplayMode('subwaysurfers')
    if (added) { subwaysurfers_video.play() }
    else { subwaysurfers_video.pause() }

    const button = document.getElementById("subwaysurfers-button")
    button.innerText = added ? "Ok basta" : "Distraimi"
}

function toggleSubwaySurfersVolume() {
    const added = toggleClass(subwaysurfers_video, 'muted')
    subwaysurfers_video.muted = !!added;

    const buttonIcon = document.getElementById("subwaysurfers-mute-button-icon")
    buttonIcon.src = added ? "assets/speaker-off.png" : "assets/speaker.png"
}

function addItemSections(parent) {
    const exclude = [""]
    Object.keys(CONFIG.sheet.items.types).forEach((key) => {
        const type = CONFIG.sheet.items.types[key]

        if (exclude.includes(key)) {return}
        const e = document.createElement("section")
        e.className = "cs-section"
        e.id = `section-${key}`

        const header = document.createElement("div")
        header.className = "cs-section-header"
        const icon = document.createElement("img")
        icon.className = "icon-mono display-mode-dynamic-icon"
        icon.src = `${CONFIG.sheet.items.iconRoot}${type.icon}`
        header.appendChild(icon)
        const title = document.createElement("h3")
        title.innerText = type.names.section_title
        header.appendChild(title)

        e.appendChild(header)
        parent.appendChild(e)
    })
}

function makeImageCarouselSearchButton(source_elements) {
    const btnSearch = document.createElement("button")
    btnSearch.className = "imageCarousel-button-search"
    btnSearch.onclick = () => {
        const text = []
        forAllElements(source_elements, e => {
            text.push(e.innerText || e.value)
        })
        const query = text.join(', ')
        console.log('Attempting to open quick image search for: ', query)
        window.open(googleImageSearchUrl(query), '_blank').focus();
    }
    const iconSearch = document.createElement("img")
    iconSearch.className = "icon-mono display-mode-dynamic-icon"
    iconSearch.src = "assets/magnifying-lens.png"
    iconSearch.alt = "+"
    btnSearch.appendChild(iconSearch)
    btnSearch.appendChild(document.createTextNode("Cerca immagine"))

    return btnSearch
}

function addImageCarouselOptions(e) {
    const wrapper = document.createElement("div")
    wrapper.className = "flex-hor image-carousel-options"

    const btnUpload = document.createElement("button")
    btnUpload.className = "imageCarousel-button-upload"
    btnUpload.onclick = () => { getFiles('image/*', true, f => { addImages(e.querySelector('.image-carousel'), f) }) }
    const iconUpload = document.createElement("img")
    iconUpload.className = "icon-mono display-mode-dynamic-icon"
    iconUpload.src = "assets/camera-plus.png"
    iconUpload.alt = "+"
    btnUpload.appendChild(iconUpload)
    btnUpload.appendChild(document.createTextNode("Aggiungi immagine"))

    const btnLink = document.createElement("button")
    btnLink.className = "imageCarousel-button-link"
    btnLink.onclick = () => {
        promptValidURL("Aggiungi un'immagine tramite URL", "Link all'immagine:", (url) => {
                fetchimage(url,
                    b => { addImages(e.querySelector('.image-carousel'), [b]) }
                )
            }
        )
    }
    const iconLink = document.createElement("img")
    iconLink.className = "icon-mono display-mode-dynamic-icon"
    iconLink.src = "assets/link.png"
    iconLink.alt = "+"
    btnLink.appendChild(iconLink)
    btnLink.appendChild(document.createTextNode("Immagine dal link"))

    wrapper.appendChild(btnUpload)
    wrapper.appendChild(btnLink)
    if (e.id === 'section-mainImage') {
        const source_elements = [
            document.getElementById('main-title'),
            document.getElementById('input-author'),
            document.getElementById('input-dateFrom-year')
        ]
        wrapper.appendChild(makeImageCarouselSearchButton(source_elements))
    }
    e.appendChild(wrapper)
}

function getDynamicBackground(string) {
    console.log('computing dynamic background...')
    const bgasset = findLastContainedStringArrays(CONFIG.sheet.items.dynamicBackgrounds, string.toLowerCase())
    return CONFIG.sheet.items.dynamicBackgroundsRoot + `DYNBG-${bgasset}.png`
}

function appendItem(type, content) {
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.dataset.itemtype = type
    const itemID = `csITEM-UUID-${getRandomUUID()}`
    e.id = itemID
    e.style.backgroundImage = `url("${getDynamicBackground(content)}")`

    const paragraph = document.createElement("p")
    paragraph.style.margin = "10px"
    paragraph.innerText = content
    e.appendChild(paragraph)

    const carouselWrapper = document.createElement("div")
    carouselWrapper.className = "imageCarousel-wrapper"
    const carousel = document.createElement("div")
    carousel.className = "image-carousel scrollbar-visible"
    addImageCarouselOptions(carouselWrapper)
    carouselWrapper.appendChild(carousel)

    const btnWrapper = document.createElement("div")
    btnWrapper.className = "csItem-btn-wrapper"

    const editBtn = document.createElement("button")
    editBtn.onclick = _ => editItem(itemID)
    const editIcon = document.createElement("img")
    editIcon.className = "icon-mono display-mode-dynamic-icon"
    editIcon.src = "assets/pencil.png"
    editBtn.appendChild(editIcon)

    const xBtn = document.createElement("button")
    xBtn.onclick = _ => deleteItem(itemID)
    const xIcon = document.createElement("img")
    xIcon.className = "icon-mono display-mode-dynamic-icon"
    xIcon.src = "assets/x.png"
    xBtn.appendChild(xIcon)

    btnWrapper.appendChild(editBtn)
    btnWrapper.appendChild(xBtn)

    e.appendChild(carouselWrapper)
    e.appendChild(btnWrapper)

    const p = document.getElementById(`section-${type}`)
    p.appendChild(e)
    p.style.display = 'inherit'
    return e
}

function editItem(eID) {
    const p = document.getElementById(eID)
    const e = document.querySelector(`#${eID} > p`)
    const type = CONFIG.sheet.items.types[e.parentNode.dataset.itemtype]
    editItemDialog(e, (nt) => {
        if (nt==null || nt.trim()==="") { return }
        e.innerText = nt
        p.style.backgroundImage = `url("${getDynamicBackground(nt)}")`
    }, null, `Modifica ${type.names.singular}`)
}

function deleteItem(eID) {
    const e = document.getElementById(eID)
    const type = CONFIG.sheet.items.types[e.dataset.itemtype]
    const p = document.getElementById(`section-${e.dataset.itemtype}`)
    const removeItem = () => {
        e.remove()
        if (p.querySelectorAll('.cs-item').length === 0) p.style.display = 'none'
    }
    if (
        document.querySelector(`#${eID} > p`).innerText.length > CONFIG.sheet.editing.deleteWarningLengthThreshold ||
        document.querySelectorAll(`#${eID} .image-carousel .carousel-image`).length > 0 && CONFIG.sheet.editing.deleteWarningWhenImagePresent
    ) {
        yesNoDialog(removeItem, null,
            `Vuoi davvero eliminare questo elemento (${type.names.singular})?`,
            "Se confermi, verrà eliminato permanentemente")
    } else { removeItem() }
}

function addImages(parent, files) {
    for (const i in files) {
        const wrapper = document.createElement("div")
        wrapper.className = "carousel-image"

        const img = document.createElement("img")
        img.src = URL.createObjectURL(files[i])
        wrapper.appendChild(img)

        const xBtn = document.createElement("button")
        xBtn.className = "deleteBtn"
        xBtn.onclick = () => {
            yesNoDialog(() => {wrapper.remove()}, null,
                `Rimuovere immagine?`, "Se confermi, l'immagine verrà eliminata dalla scheda, ma potrai aggiungerla nuovamente in futuro")
        }
        const xIcon = document.createElement("img")
        xIcon.className = "icon-mono display-mode-dynamic-icon"
        xIcon.src = "assets/x.png"
        xBtn.appendChild(xIcon)
        wrapper.appendChild(xBtn)

        parent.appendChild(wrapper)
    }
}


