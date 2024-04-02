import axios from "axios";

export const http = axios.create({
    baseURL: "https://zscroll.peclick.com/api/",
})
// baseURL: "https://api.jadescrolls.com/api/",