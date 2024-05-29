
function sharePage(title, description, url) {
    if (typeof navigator.share == "function") {
        const shareData = {
            title: title,
            text: description,
            url: url
        }
        navigator.share(shareData)
    } else {
        navigator.clipboard.writeText(url)
        alert("Url copiato negli appunti!")
    }
}