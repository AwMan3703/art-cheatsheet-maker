

// Prepare/restore an element for/after screenshot
const preScreenshot = () => {
    // Add screenshot class, so that structure and styles can be modified
    document.body.classList.add("during-screenshot")
}
const postScreenshot = () => {
    // restore body structure and styles
    document.body.classList.remove("during-screenshot")
}
// Screenshot [element], then pass it as an HTMLCanvasElement to [callback]
const screenshot = (element, callback) => {
    preScreenshot()
    html2canvas(element).then(callback)
    // FIXME:
    //  <input>'s content gets offset and cropped when being captured
    postScreenshot()
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