import config from "../config";

const fetch = {
    async fetchData(endpoint, options = {}, headers = {}) {
        const url = `${config.apiURL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
    async postData(endpoint, data, headers = {}) {
        return this.fetchData(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        }, headers);
    },
    async putData(endpoint, data, headers = {}) {
        return this.fetchData(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        }, headers);
    },
    async deleteData(endpoint, headers = {}) {
        return this.fetchData(endpoint, {
            method: 'DELETE',
        }, headers);
    },
    async getData(endpoint, headers = {}) {
        return this.fetchData(endpoint, {
            method: 'GET',
        }, headers);
    },
    async blob(endpoint, options = {}, headers = {}) {
        const url = `${config.apiURL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.blob();
    }
}
export default fetch;