import Cookies from "js-cookie"

const cookies = {
    get: (name) => Cookies.get(name),
    set: (name, value, option) => Cookies.set(name, value, option),
    remove: (name) => Cookies.remove(name)
}

export default cookies;