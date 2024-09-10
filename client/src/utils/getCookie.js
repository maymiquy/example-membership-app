export const getCookie = (name) => {
    const fetchCookie = `; ${document.cookie}`;
    const findCookie = fetchCookie.split(`; ${name}=`);
    if (findCookie.length === 2) {
        const cookieValue = findCookie.pop().split(';').shift();
        return cookieValue;
    }
}