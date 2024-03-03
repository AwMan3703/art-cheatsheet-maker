

// Prepare/restore an element for/after screenshot
const preScreenshot = () => {
    // remove dark mode if active
    const body_class = document.body.className
    document.body.classList.remove("darkmode")

    // hide all screenshot-hidden elements
    const hidden_elements = document.querySelectorAll('.screenshot-hidden')
    hidden_elements.forEach(e => { e.style.display = 'none' })

    // hide all scrollbars
    const scrollbars = document.querySelectorAll('::-webkit-scrollbar')
    scrollbars.forEach(e => { e.style.display = 'none' })

    return {
        body_class : body_class,
        hidden_elements : hidden_elements,
        scrollbars : scrollbars
    }
}
const postScreenshot = (data) => {
    // restore body display mode
    document.body.className = data.body_class
    // show screenshot-hidden elements
    data.hidden_elements.forEach(e => { e.style.display = '' })
    // show previously hidden scrollbars
    data.scrollbars.forEach(e => { e.style.display = '' })
}
// Screenshot [element], then pass it as an HTMLCanvasElement to [callback]
const screenshot = (element, callback) => {
    const data = preScreenshot()
    html2canvas(element).then(callback)
    // FIXME:
    //  <input>'s content gets offset and cropped when being captured
    postScreenshot(data)

}

function exportSheet() {
    const sheet = document.getElementById("content-body")
    const downloadButton = document.getElementById("download-point")

    const toDownloadButton = (canvas) => {
        downloadButton.href = canvas.toDataURL("img/jpeg")
        downloadButton.classList.add("available")
        downloadButton.download = document.getElementById("main-title").innerText

        downloadButton.addEventListener("click", () => {
            downloadButton.classList.remove("available")
        })
    }
    screenshot(sheet, toDownloadButton)
}

// TODO: consider adding an "Export interactive sheet" option (see below)
/* Interactive sheets are HTML files displaying the information in an interactive way
* Example functionalities of an interactive sheet:
* - Expand details
* - Click a name/place to open a wikipedia reference
* - Click a description to highlight the part of the image it's referring to
*/