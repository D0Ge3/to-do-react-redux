import React, {useEffect} from 'react'

import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Pagination } from '@material-ui/lab'
import TaskDetails from './Task/TaskDetails/TaskDetails'
import TaskList from './TaskList'

const Tasks = ({items, totalCount, currentPage, pageSize, changePage, todolistId, 
	addTask, updateTask, isFetching, selectTask, selectedItem, deleteTask, updateTaskTitle}) => {
		
  useEffect(() => () => selectTask(null), [])

  return (
    <Container>
      <Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<TaskList
						isFetching={isFetching}
						updateTaskTitle={updateTaskTitle}
						deleteTask={deleteTask}
						selectedItemId={selectedItem.id}
						selectTask={selectTask}
						items={items}
						todolistId={todolistId}
						addTask={addTask}
					/>
					{totalCount > pageSize && (
						<Pagination onChange={changePage} page={currentPage} count={Math.ceil(totalCount/pageSize)} />
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<TaskDetails
						todolistId={todolistId}
						updateTaskTitle={updateTaskTitle}
						updateTask={updateTask}
						selectedItem={selectedItem}
					/>
				</Grid>
      </Grid>
    </Container>
	)
}

export default Tasks