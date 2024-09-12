
function toggleDisplayMode(dm) {
    dm = `displaymode-${dm}`
    const added = document.body.classList.toggle(dm)
    if (added) CONFIG.ui.displayModes.push(dm)
    else try { CONFIG.ui.displayModes = CONFIG.ui.displayModes.filter(v => v !== dm) } catch (e) { console.error(e) }
    return added
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
    btnUpload.appendChild(document.createTextNode("Add image"))

    const btnLink = document.createElement("button")
    btnLink.className = "imageCarousel-button-link"
    btnLink.onclick = () => {
        promptValidURL("Link an image", "Image URL:", (url) => {
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
    btnLink.appendChild(document.createTextNode("Add image from link"))

    wrapper.appendChild(btnUpload)
    wrapper.appendChild(btnLink)
    e.appendChild(wrapper)
}

function getDynamicBackground(string) {
    console.log('computing dynamic background...')
    const bgasset = findLastContainedStringArrays(CONFIG.sheet.items.dynamicBackgrounds, string.toLowerCase())
    return CONFIG.sheet.items.dynamicBackgroundsRoot + `DYNBG-${bgasset}.png`
}

function addItem(type) {
    textInputDialog((text) => {
        if (!isEmptyString(text)) appendItem(type, text)
    }, null, `New ${CONFIG.sheet.items.types[type].names.singular}`, "content:", "Add")
}
function appendItem(type, content) {
    const e = document.createElement("div")
    e.className = `cs-item item-${type}`
    e.dataset.itemtype = type
    const itemID = getUUID("item")
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
    }, null, `Edit ${type.names.singular}`)
}

function deleteItem(eID) {
    const e = document.getElementById(eID)
    const type = CONFIG.sheet.items.types[e.dataset.itemtype]
    if (
        document.querySelector(`#${eID} > p`).innerText.length > CONFIG.sheet.editing.deleteWarningLengthThreshold ||
        document.querySelectorAll(`#${eID} .image-carousel .carousel-image`).length > 0 && CONFIG.sheet.editing.deleteWarningWhenImagePresent
    ) {
        yesNoDialog(() => {e.remove()}, null,
            `Do you want to delete this ${type.names.singular} entry?`,
            "If you confirm, the item will be permanently deleted")
    } else { e.remove() }
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
                `Delete image?`, "If you confirm, the image will be permanently deleted")
        }
        const xIcon = document.createElement("img")
        xIcon.className = "icon-mono display-mode-dynamic-icon"
        xIcon.src = "assets/x.png"
        xBtn.appendChild(xIcon)
        wrapper.appendChild(xBtn)

        parent.appendChild(wrapper)
    }
}


