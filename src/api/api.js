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
    },
    addNewList(title) {
        return instance.post("/todo-lists", {title}).then(res => res.data);
    },
    deleteList(todolistId) {
        return instance.delete(`/todo-lists/${todolistId}`).then(res => res.data);
    },
    updateListTitle(todolistId, title) {
        return instance.put(`/todo-lists/${todolistId}`, {title}).then(res => res.data);
    },
    reorderList(todolistId, putAfterItemId) {
        //Target todolist will be order after this todolist.
        // If value is null, then todolist will be move to the top of the list
        return instance.put(`/todo-lists/${todolistId}/reorder`, {putAfterItemId}).then(res => res.data);
    }
}
export const tasksAPI = {
    getTasks(todolistId, count, page) {
        return instance.get(`/todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
            .then(res => res);
    },
    addTask(todolistId, title) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title}).then(res => res.data);
    },
    reorderTask(todolistId, taskId, putAfterItemId) {
        //Target task will be moved after this task.
        // If value is null, then task will be moved at the first positions
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
            .then(res => res.data);
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`).then(res => res.data);
    },
    updateTask(todolistId, taskId, taskData) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, taskData).then(res => res.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`).then(res => res.data);
    }
}