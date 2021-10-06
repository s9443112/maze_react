import $, { data } from "jquery";
// console.log(process.env.REACT_APP_BACKEND_URL)

var pad = "";
if (process.env.REACT_APP_BACKEND_URL[process.env.REACT_APP_BACKEND_URL.length - 1] !== "/") {
    pad = "/";
}



async function post(url, data, type = "POST") {
    if (url[0] === "/") {
        url = url.substr(1);
    }
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }
    try {
        return await $.ajax({
            url: process.env.REACT_APP_BACKEND_URL + pad + url,
            data: data,
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            xhrFields: { withCredentials: true },
            type: type
        });
    } catch (error) {
        // checkLoginError(error);
        throw error;
    }
}

async function get(url, params = {}) {
    if (url[0] === "/") {
        url = url.substr(1);
    }
    try {
        let URL = new window.URL(process.env.REACT_APP_BACKEND_URL + pad + url);
        for (let param in params) {
            if (params[param] !== null && params[param] !== undefined) {
                URL.searchParams.set(param, params[param]);
            }
        }
        return await $.ajax({
            url: URL.href,
            crossDomain: true,
            
        });
    } catch (error) {
        // checkLoginError(error);
        console.log(error)
        throw error;
    }
}





export async function GetFriendList() {
    return (await get(`/friend_list`))
}











