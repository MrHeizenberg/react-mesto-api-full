export function renderLoading(isLoading, popupButton) {
    if (isLoading) {
        popupButton.textContent = popupButton.textContent + "..."
    }
    else {
        popupButton.textContent = popupButton.textContent.replace('...', '')
    }
}