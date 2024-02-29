
// Screenshot [element], then pass it as an HTMLCanvasElement to [callback]
const screenshot = (element, callback) => {
    const body_class = document.body.className
    document.body.classList.remove("darkmode")

    const hidden_elements = document.querySelectorAll('.screenshot-hidden')
    const setDisplayAll = (value) => {
        for (let i = 0; i < hidden_elements.length; i++) {
            const element = hidden_elements[i]
            element.style.display = value
        }}

    setDisplayAll('none')
    html2canvas(element).then(callback)
    setDisplayAll('')

    document.body.className = body_class
}

function exportSheet() {
    const sheet = document.getElementById("content-body")
    const downloadButton = document.getElementById("download-point")

    const toDownloadButton = (canvas) => {
        downloadButton.href = canvas.toDataURL("img/jpeg")
        downloadButton.classList.add("available")
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