export function extractTime(dateString) {
    const date = new Date(dateString);
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedHours = padZero(date.getHours() % 12 || 12);
    const minutes = padZero(date.getMinutes());
    return `${formattedHours}:${minutes} ${ampm}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
