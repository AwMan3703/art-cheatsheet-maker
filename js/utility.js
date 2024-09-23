
function getRandomUUID() {
    // Fallback for crypto.randomUUID() because apparently some devices still don't support it lol
    try { return crypto.randomUUID() }    // "mom can we get randomUUID()?"
    catch (e) {                           // "we have randomUUID() at home"
        alert("LMAO-"+e)
        console.error(e)
    }
    // randomUUID() at home:
    const r = _ => Math.round(1000000 * Math.random())
    return `${r()}-${r()}-${r()}-${r()}-${r()}`
}

// If the element is in the array, it gets removed – if not, it gets added
const arrayToggle = (arr, val) =>
    arr.includes(val) ? arr.filter(el => el !== val) : [...arr, val]

// Add or remove class C from element E - optionally calls callback CB
//  - passes true if the class was added
//  - passes false if the class was removed
function toggleClass(e, c, cb) {
    const b = e.classList.toggle(c)
    if (cb) cb(b)
    return b
}

// Gets a nested item from a string key
// const json = { "my" : { "nested" : { "item" : "myContent" } } }
// getNestedJSON(json, "my.nested.item") // returns "myContent"
function getNestedJSON(json, path) {
    let tmp = json
    for (const k of path.split('.')) tmp = tmp[k]
    return tmp
}
// Sets a nested item from a string key
// let json = { "my" : { "nested" : 12 } }
// setNestedJSON(json, "my.nested.item", "myContent") // returns { "my" : { "nested" : { "item" : "myContent" } } }
function setNestedJSON(json, path, value) {
    const steps = path.split('.')
    let tmp = json

    for (let i = 0; i < steps.length - 1; i++) {
        const step = steps[i]
        if (!tmp.hasOwnProperty(step)) {
            tmp[step] = {}
        }
        tmp = tmp[step]
    }

    tmp[steps[steps.length - 1]] = value

    return json
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

// Finds the last occurrence of a string from `array` that is contained in `targetString`, then returns it
function findLastContainedString(array, targetString) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (targetString.includes(array[i])) return array[i];
    }
    return null;
}
// Same as `findLastContainedString`, but works on an array of arrays of strings instead of an array of strings
function findLastContainedStringArrays(obj, targetString) {
    const keys = Object.keys(obj);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const value = obj[keys[i]];
        if (findLastContainedString(value, targetString) !== null) return key;
    }
    return null;
}