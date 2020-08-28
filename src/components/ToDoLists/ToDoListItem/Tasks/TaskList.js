import React, {useState} from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Task from "./Task/Task";
import List from "@material-ui/core/List";

const AddTaskForm = ({todolistId, addTask}) => {

    let [task, setTask] = useState("");
    const onChangeTask = e => setTask(e.target.value);
    const onAddTask = () => {
        addTask(todolistId, task);
    }
    return (
        <>
            <Input value={task} onChange={onChangeTask}/>
            <Button onClick={onAddTask}>add</Button>
        </>
    )
}

const TaskList = ({items, totalCount, currentPage, todolistId, addTask}) => {

    const tasks = items.map(t => <Task key={t.id} task={t}/>);

    return (
        <>
            <AddTaskForm todolistId={todolistId} addTask={addTask}/>
            <List component="nav" aria-label="main mailbox folders">
                {tasks}
            </List>
        </>
    )
}

export default TaskList;