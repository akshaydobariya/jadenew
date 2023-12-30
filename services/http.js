import axios from "axios";

export const http = axios.create({
    baseURL: "https://zscroll.peclick.com/api/",

    headers: {
        Accept: "application/json",
    }
})