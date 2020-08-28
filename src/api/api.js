import * as axios from "axios";
import {API_KEY} from "../config";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": API_KEY}
});

export const authAPI = {
    me() {
        return instance.get("/auth/me").then(res => res.data);
    },
    login(email, password, rememberMe, captcha = false) {
        return instance.post("/auth/login", {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logout() {
        return instance.delete("/auth/login").then(res => res.data);
    }
}

export const todoListsAPI = {
    todoLists() {
        return instance.get("/todo-lists").then(res => res);
    }
}