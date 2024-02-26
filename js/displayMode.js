function toggleDisplayMode(mode) {
    const element = document.body
    if (element.classList.contains(mode)) {
        element.classList.remove(mode)
    } else {
        element.classList.add(mode)
    }
}
