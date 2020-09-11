import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import {
  setCurrentPage,
  selectTaskAC,
  getTasksThunk,
} from '../../redux/actions/tasksActions'

import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '@material-ui/lab'
import TaskDetails from './Task/TaskDetails/TaskDetails'
import TaskList from './TaskList'

const Tasks = () => {
  const dispatch = useDispatch()

  const { listId } = useParams()
  const items = useSelector((state) => state.tasks.items)
  const totalCount = useSelector((state) => state.tasks.totalCount)
  const currentPage = useSelector((state) => state.tasks.currentPage)
  const pageSize = useSelector((state) => state.tasks.pageSize)
  const selectedItem = useSelector((state) => state.tasks.selectedItem)
  const isFetching = useSelector((state) => state.tasks.isFetching)
  const isAuth = useSelector((state) => state.auth.isAuth)

  const selectTask = (taskId) => dispatch(selectTaskAC(taskId))
  const changePage = (object, page) => dispatch(setCurrentPage(page))

  useEffect(() => {
    selectTask(null)
    dispatch(getTasksThunk(listId, pageSize, currentPage))
  }, [listId, currentPage])

  return isAuth ? (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TaskList
            isFetching={isFetching}
            selectedItemId={selectedItem.id}
            items={items}
            listId={listId}
          />
          {totalCount > pageSize && (
            <Pagination
              onChange={changePage}
              page={currentPage}
              count={Math.ceil(totalCount / pageSize)}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskDetails listId={listId} selectedItem={selectedItem} />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Redirect to="/login" />
  )
}

export default Tasks
