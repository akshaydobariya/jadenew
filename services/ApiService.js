import { http } from "./http";

function useApiService() {
    function signUpApi(params) {
        return http.post("auth/signup", params).then((res) => {
            return res
        })
    }

    function verifyOtpApi(params) {
        return http.post("auth/verify-otp", params).then((res) => {
            return res
        })
    }

    function loginApi(params) {
        return http.post("auth/login", params).then((res) => {
            return res
        })
    }

    function getNovels() {
        return http.get("public/get-new-released-novels").then((res) => {
            return res
        })
    }

    function getMostPopularNovels() {
        return http.get("public/get-most-popular-novels").then((res) => {
            return res
        })
    }

    function getNovelByGenre() {
        return http.get("public/get-all-gernes").then((res) => {
            return res
        })
    }

    function getNovelByid(id) {
        return http.get(`public/get-novels-by-genre?genre=${id}&page=1&limit=10`).then((res) => {
            return res
        })
    }

    function bookmarkNovel() {
        return http.post(`user/bookmark-novel?id=65799dc3255c0513947a21d1`).then((res) => {
            return res
        })
    }

    function getBookmarkNovel() {
        return http.get(`user/get-my-bookmark-novels`).then((res) => {
            return res
        })
    }

    function getProfile() {
        return http.get('user/get-profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getLatesUpdateNovels() {
        return http.get('public/get-latest-update-novels').then((res) => {
            return res
        })
    }

    function getOriginalWork() {
        return http.get('public/get-original-novels').then((res) => {
            return res
        })
    }

    function getRankingByCoins() {
        return http.get('public/get-rank-by-coin-novels').then((res) => {
            return res
        })
    }

    function getRankingByView() {
        return http.get('public/get-rank-by-view-novels').then((res) => {
            return res
        })
    }

    function getRankingByBookmark() {
        return http.get('public/get-rank-by-bookmark-novels').then((res) => {
            return res
        })
    }

    function getPopularThisWeek() {
        return http.get('public/get-popular-this-week-novels').then((res) => {
            return res
        })
    }

    function getNovelDetailById(id) {
        return http.get(`public/get-novel?id=${id}`).then((res) => {
            return res
        })
    }


    return {
        getNovelDetailById,
        getPopularThisWeek,
        getRankingByBookmark,
        getRankingByView,
        getRankingByCoins,
        getOriginalWork,
        getLatesUpdateNovels,
        getProfile,
        getBookmarkNovel,
        bookmarkNovel,
        getNovelByid,
        getNovelByGenre,
        getMostPopularNovels,
        getNovels,
        signUpApi,
        verifyOtpApi,
        loginApi,
    }
}

export default useApiService;