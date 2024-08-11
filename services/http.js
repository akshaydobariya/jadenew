import axios from "axios";

export const http = axios.create({
    baseURL: "https://api.jadescrolls.org/api/"
    // baseURL: "https://zscroll.peclick.com/api/"
    // baseURL: "https://localhost:4000/api/"
})