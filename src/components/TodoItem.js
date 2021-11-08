import React, { useState, useEffect } from "react";
import TodoService from "../services/TodoService";
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoItem = props => {

    const initialItemState = {
        id: null,
        note: "",
        completed: false
    };

    const [currentItem, setCurrentItem] = useState(initialItemState);
    const [message, setMessage] = useState("");

    const getItem = id => {
        TodoService.get(id)
            .then(response => {
                setCurrentItem(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getItem(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentItem({...currentItem, [name]: value});
    };

    const updateCompleted = status => {
        var data = {
            id: currentItem.id,
            note: currentItem.note,
            completed: status
        };

        TodoService.update(currentItem.id, data)
            .then(response => {
                setCurrentItem({...currentItem, completed: status});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateItem = () => {
        TodoService.update(currentItem.id, currentItem)
            .then(response => {
                console.log(response.data);
                setMessage("The current task has been successfully updated!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteItem = () => {
        TodoService.remove(currentItem.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/todos");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentItem ? (
                <div className="edit-form">
                    <h4>Current todo task</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="note">Task</label>
                            <input
                                type="text"
                                className="form-control"
                                id="note"
                                name="note"
                                value={currentItem.note}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentItem.completed ? "Completed" : "Unfinished"}
                        </div>
                    </form>

                    {currentItem.completed ? (
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => updateCompleted(false)}
                        >
                            Status
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => updateCompleted(true)}
                        >
                            Status
                        </button>
                    )}

                    <button className="btn btn-outline-primary btn-sm"
                            onClick={deleteItem}>
                            Delete!
                    </button>

                    <button
                        type="submit"
                        className="btn btn-outline-warning btn-sm"
                        onClick={updateItem}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please choose and click on a todo task...</p>
                </div>
            )}
        </div>
    );
};

export default TodoItem;