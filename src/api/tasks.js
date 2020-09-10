import { instance } from './axiosInstance'

export const tasksAPI = {
  getTasks(todolistId, count, page) {
    return instance
      .get(`/todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
      .then((res) => res)
  },
  addTask(todolistId, title) {
    return instance
      .post(`/todo-lists/${todolistId}/tasks`, { title })
      .then((res) => res)
  },
  reorderTask(todolistId, taskId, putAfterItemId) {
    //Target task will be moved after this task.
    // If value is null, then task will be moved at the first positions
    return instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, { putAfterItemId })
      .then((res) => res.data)
  },
  deleteTask(todolistId, taskId) {
    return instance
      .delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
      .then((res) => res)
  },
  updateTask(todolistId, taskId, taskData) {
    return instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}`, taskData)
      .then((res) => res)
  },
}
