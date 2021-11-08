import React, { useState, useEffect } from "react";
import TodoService from "../services/TodoService";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export * from 'react-router';


const TodoIList = () => {

    const [todoItems, setTodoItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveItems();
    }, []);

    const retrieveItems = () => {
        TodoService.getAll()
            .then(response => {
                setTodoItems(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
        setCurrentItem(null);
        setCurrentIndex(-1);
    };

    const setActiveItem = (item, index) => {
        setCurrentItem(item);
        setCurrentIndex(index);
        //console.log(item.id)
    };

    const removeAllItems = () => {
        TodoService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>List of ToDo tasks</h4>
                <ul className="list-group">
                    {todoItems &&
                    todoItems.map((item, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveItem(item, index)}       // item.id вместо item
                            key={index}
                        >
                            {item.note}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllItems}
                >
                    Remove All
                </button>
            </div>

            <div className="col-md-6">
                {currentItem ? (
                    <div>
                        <h4>Current todo task</h4>
                        <div>
                            <label>
                                <strong>To do:</strong>
                            </label>{" "}
                            {currentItem.note}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentItem.completed ? "Completed" : "Unfinished"}
                        </div>

                        <Link
                            className="btn btn-outline-warning btn-sm"
                            to={"/todos/" + currentItem.id}
                        >
                            Edit current task
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on the task to select...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoIList;