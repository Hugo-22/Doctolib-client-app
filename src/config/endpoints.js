export const endpoints = {
    auth: {
        register: '/api/auth/local/register',
        registerCustomer: '/api/customers?populate=*',
        login: '/api/auth/local',
        role: {
            put: id => `/api/users/${id}?populate=*`
        },
        githubConnectCallback: '/api/auth/github/callback'
    },
    users: {
        collection: '/api/users',
        item: id => `/api/users/${id}?populate=*`
    },
    providers: {
        collection: '/api/providers',
        item: id => `/api/providers/${id}`
    },
    appointment: {
        collection: '/api/appointments',
        item: id => `/api/appointments/${id}`
    },
    coords: 'https://api-adresse.data.gouv.fr/search'
}