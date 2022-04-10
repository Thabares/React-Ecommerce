import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTI4NzdmOTMxMzNkYjNhODhhMjNiYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDk1NzY3OTAsImV4cCI6MTY0OTgzNTk5MH0.ty6VTG30XEsyddO9iZy7nXe63YES1UjYQtD0aTPBKnU";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {
        token: "Bearer " + TOKEN
    }
})