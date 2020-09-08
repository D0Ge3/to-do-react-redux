import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTaskThunk,
  deleteTaskThunk,
  getTasksThunk,
  setCurrentPage,
  selectTaskAC,
  updateTaskThunk,
  updateTaskTitleThunk,
} from '../../redux/tasksReducer';
import Tasks from './Tasks';

const TasksContainer = ({ match }) => {
  const todolistId = match.params.listId;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.tasks.items);
  const totalCount = useSelector((state) => state.tasks.totalCount);
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const selectedItem = useSelector((state) => state.tasks.selectedItem);
  const isFetching = useSelector((state) => state.tasks.isFetching);
  const pageSize = useSelector((state) => state.tasks.pageSize);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getTasksThunk(todolistId, pageSize, currentPage));
  }, [todolistId, currentPage]);

  // Аналогично. можешь перенести логику добавления, редактирования и тд в сами компонены, чтобы не было этого ада с пропсами
  const updateTask = (taskData) => dispatch(updateTaskThunk(taskData));
  const updateTaskTitle = (todolistId, task, newTitle) =>
    dispatch(updateTaskTitleThunk(todolistId, task, newTitle));
  const deleteTask = (todolistId, taskId) => dispatch(deleteTaskThunk(todolistId, taskId));
  const selectTask = (taskId) => dispatch(selectTaskAC(taskId));
  const addTask = (todolistId, title) => dispatch(addTaskThunk(todolistId, title));

  const changePage = (object, page) => dispatch(setCurrentPage(page));

  if (!isAuth) return <Redirect to="/login" />;
  return (
    <Tasks
      changePage={changePage}
      pageSize={pageSize}
      isFetching={isFetching}
      updateTask={updateTask}
      updateTaskTitle={updateTaskTitle}
      deleteTask={deleteTask}
      selectedItem={selectedItem}
      selectTask={selectTask}
      addTask={addTask}
      todolistId={todolistId}
      items={items}
      totalCount={totalCount}
      currentPage={currentPage}
    />
  );
};

export default withRouter(TasksContainer);
