import config from "../config";

export const auth = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${config.apiURL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },
    logout: async (token) => {
        try {
            const response = await fetch(`${config.apiURL}auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    },
    authorize: async (token) => {
        try {
            const response = await fetch(`${config.apiURL}auth/authorize`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Authorization failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during authorization:', error);
            throw error;
        }
    }
}
