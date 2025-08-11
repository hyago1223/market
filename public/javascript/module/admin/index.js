import adminConfig from "./config.js";

export const adminFetch = async (endpoint, options = {},token) => {
    const url = `${adminConfig.apiURL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}