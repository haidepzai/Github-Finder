import axios from "axios"
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {Authorization: `token ${GITHUB_TOKEN}`}
})


// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text //q=text
    })

    console.log(`${GITHUB_URL}/search/users?${params}`)
    //https://api.github.com/search/users?q=text

    const response = await github.get(`/search/users?${params}`)
    return response.data.items

    //Ohne Axios:
    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    //     headers: {
    //         Authorization: `token ${GITHUB_TOKEN}`
    //     }
    // })

    // Response besteht aus total_count, incomplete_results, items array, usw
    // Uns interessiert nur das items Array
    // const {items} = await response.json() //users

    // return items
}

// Get user and repos
export const getUserAndRepos = async(login) => {
    //Promise.all wie forkjoin (mehrere Requests) HTTP Chaining
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return { user: user.data, repos: repos.data }
}


/*
// Get single user
export const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if(response.status === 404) {
        window.location = '/notfound'
    } else {
        const data = await response.json() // single user

        return data
    }
}

// Get user repos
export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    console.log(`${GITHUB_URL}/users/${login}/repos?${params}`);

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    const data = await response.json() //repo

    return data
}
*/