import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddItem from "./components/AddItem";
import TodoItem from "./components/TodoItem";
import TodoIList from "./components/TodoList";
import {Route, Switch, Link} from "react-router-dom";
export * from 'react-router';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/todos" className="navbar-brand">
          YOUR TODO
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add task
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todos"]} component={TodoIList} />
          <Route exact path="/add" component={AddItem} />
          <Route path="/todos/:id" component={TodoItem} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
