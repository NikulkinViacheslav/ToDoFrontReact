import React, { useState } from "react";
import TodoService from "../services/TodoService";

const AddItem = () => {

    const initialItemState = {
        id: null,
        note: "",
        completed: false
    };

    const [todoItem, setTodoItem] = useState(initialItemState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTodoItem({...todoItem, [name]: value});
    };

    const saveItem = () => {
        let data = {
            note: todoItem.note
        };

        TodoService.create(data)
            .then(response =>  {
                setTodoItem({
                    id: response.data.id,
                    note: response.data.note,
                    completed: response.data.completed
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    const newTodoItem = () => {
        setTodoItem(initialItemState);
        setSubmitted(false);
    }



    return (
        <div className="submit-form">
            {submitted ? (  // если на форме нажата кнопка SUBMIT - появляется кнопка добавить еще одну новую задачу
                <div>
                    <h4>Your data has been successfully sent!</h4>
                    <button className="btn btn-success" onClick={newTodoItem}>
                        Add new task
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="note">Enter new task:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="note"
                            required
                            value={todoItem.note}
                            onChange={handleInputChange}
                            name="note"
                        />
                    </div>

                    <button onClick={saveItem} className="btn btn-success">
                        Submit task
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddItem;