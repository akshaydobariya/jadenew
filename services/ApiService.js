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

    return {
        signUpApi,
        verifyOtpApi,
        loginApi,
    }
}

export default useApiService;