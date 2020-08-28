import React from "react";
import {withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import {compose} from "redux";
import {connect} from "react-redux";
import ToDoList from "./ToDoList";

const ToDoListContainer = (props) => {



    return (<ToDoList />)
}

const mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    connect(mapStateToProps,{}),
    withRouter
)(ToDoListContainer);