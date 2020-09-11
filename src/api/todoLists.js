import { instance } from './axiosInstance'

export const todoListsAPI = {
  todoLists() {
    return instance.get('/todo-lists').then((res) => res)
  },
  addNewList(title) {
    return instance.post('/todo-lists', { title }).then((res) => res)
  },
  deleteList(todolistId) {
    return instance.delete(`/todo-lists/${todolistId}`).then((res) => res)
  },
  updateListTitle(todolistId, title) {
    return instance
      .put(`/todo-lists/${todolistId}`, { title })
      .then((res) => res)
  },
  reorderList(todolistId, putAfterItemId) {
    //Target todolist will be order after this todolist.
    // If value is null, then todolist will be move to the top of the list
    return instance
      .put(`/todo-lists/${todolistId}/reorder`, { putAfterItemId })
      .then((res) => res.data)
  },
}
