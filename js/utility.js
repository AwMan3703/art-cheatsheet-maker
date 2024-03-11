
// Add or remove class C from element E - optionally calls callback CB
//  - passes true if the class was added
//  - passes false if the class was removed
function toggleClass(e, c, cb) {
    const b = e.classList.toggle(c)
    if (cb) cb(b)
}

// Checks if the given URL is valid
function validURL(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
}

// Prompts the user, then asserts the input to be a valid URL
const promptValidURL = function(title, label, callback) {
    textInputDialog((text) => {
        if (!validURL(text)) { throw new URIError(`Invalid URL: '${text}'`) }
        else { callback(text) }
    }, null, title, label)
}

// Fetches data from a json file, then runs the callback passing it as an object
function fetchjson(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) { throw new Error(`Failed to fetch data: [${response.status}, ${response.type}] ${response.statusText}`) }
            return response.json()
        })
        .then(callback)
        .catch(error => {
            console.error('Error fetching data:', error)
        });
}

// Fetches an image from an url, then runs the callback passing it as a blob
function fetchimage(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) { throw new Error(`Failed to fetch image: [${response.status}, ${response.type}] ${response.statusText}`) }
            return response.blob()
        })
        .then(callback)
        .catch(error => {
            console.error('Error fetching image:', error)
        });
}

// Shows the file picker dialog, then runs the callback passing in the selected files as a blob array
function getFiles(type, multiple, callback) {
    const i = document.createElement("input")
    i.setAttribute("type", "file")
    i.accept = type
    i.multiple = multiple
    i.onchange = () => { callback(i.files) }
    i.click()
}

// Applies a function to all elements of an HTMLCollection of elements
function forAllElements(collection, fn) {
    for (let i = 0; i < collection.length; i++) {
        const e = collection[i]
        fn(e)
    }
}

// Converts the first letter of the string to uppercase
function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1, text.length)}

// Returns a standardized UUID string
function getUUID(object) {
    return `cs${capitalize(object)}-UUID-${crypto.randomUUID()}`
}
