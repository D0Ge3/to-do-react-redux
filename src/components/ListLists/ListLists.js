import React from "react";
import s from "./ListLists.module.css";
import {Container, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListListItem from "./ListListItem/ListListItem";
import Preloader from "../common/Preloader";
import ListAddForm from './ListAddForm';

const ListLists = ({lists, addToDoList, deleteToDoList, updateToDoListTitle, isFetching}) => {
    let toDos = lists.map(l => <ListListItem
        key={l.id}
        list={l}
        deleteToDoList={deleteToDoList}
        updateToDoListTitle={updateToDoListTitle}/>);

    return (
        <Container>
            <div className={s.todoListsWrapper}>
                <Typography variant="h4">
                    ToDos
                </Typography>
                <ListAddForm addToDoList={addToDoList} />
                <div className={s.list}>
                {isFetching
                    ? <Preloader size="40px" isCenter={true}/>
                    : <List  component="nav" aria-label="main mailbox folders">
                        {toDos}
                    </List>
                }
                </div>
            </div>
        </Container>
    )
}

export default ListLists;