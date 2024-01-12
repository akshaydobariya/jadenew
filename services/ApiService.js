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

    function bookmarkNovel(id) {
        return http.put(`user/bookmark-novel?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getBookmarkNovel() {
        return http.get(`user/get-my-bookmark-novels`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getProfile() {
        return http.get('user/get-profile', {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function profileEdit(form) {
        return http.put('user/update-profile', form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
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

    function getChapter(id) {
        return http.get(`user/get-chapter?id=${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
    }

    function searchApi(url) {
        return http.get(`public/search-novels-with-filter?${url}`).then((res) => {
            return res
        })
    }

    function postComment(id, comment) {
        return http.post(`user/post-comment?id=${id}`, comment, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function likeComment(id) {
        return http.put(`user/like-comment?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function dislikeComment(id) {
        return http.put(`user/dislike-comment?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function postReplyComment(url, comment) {
        return http.post(`user/post-reply-on-comment?${url}`, comment, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    return {
        postReplyComment,
        dislikeComment,
        likeComment,
        postComment,
        searchApi,
        getChapter,
        profileEdit,
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