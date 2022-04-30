import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTI4NzdmOTMxMzNkYjNhODhhMjNiYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTEyOTY1NTUsImV4cCI6MTY1MTU1NTc1NX0.6-pcPCrer3lnDYEUETNiG1gokD7TNrcoeZN5L7wL6q4";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: "Bearer " + TOKEN
    }
})