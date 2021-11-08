import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9147/api/todoitem",
    headers: {
        "Content-type": "application/json"
    }
});
