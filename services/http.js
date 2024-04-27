import axios from "axios";

export const http = axios.create({
    baseURL: "https://api.jadescrolls.com/api/"
    // baseURL: "https://zscroll.peclick.com/api/"
})