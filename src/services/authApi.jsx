import axios from "axios";

export const getAuthenticated = async () => {
    const authenticatedResponse = await axios.get(`/api/auth/me`);
    if (authenticatedResponse.data) {
        const {role, token} = authenticatedResponse.data;

        return ({
            roles: role,
            token,
        });
    }

    return authenticatedResponse.data;
};

export const postAuthenticated = async (credentials) => {
    const authenticatedResponse = await axios.post(`/api/auth/signIn`, credentials, {withCredentials: true});
    const {role, token} = authenticatedResponse.data;

    return ({
        roles: role,
        token,
    });

}

export const postLogout = async () => {
    // const authenticatedResponse = await axios.post(`${baseUrl}/api/auth/logout`, {}, {withCredentials: true});
    // const logout = authenticatedResponse.data;

    return ({logout});
}

export const postRegister = async (credentials) => {
    const authenticatedResponse = await axios.post(`/api/auth/signUp`, credentials, { withCredentials: true });

    const {role, token} = authenticatedResponse.data;
    return ({role, token});
}