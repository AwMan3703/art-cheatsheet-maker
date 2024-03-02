
function getFiles(type, multiple, callback) {
    const i = document.createElement("input")
    i.setAttribute("type", "file")
    i.accept = type
    i.multiple = multiple
    i.onchange = () => { callback(i.files) }
    i.click()
}