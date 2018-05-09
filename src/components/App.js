import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputValue: "",
      objectID: 0,
    }
  }

  componentWillMount() {
    const localStorageTaskList = JSON.parse(localStorage.getItem("taskList"))
    const localStorageObjectID = JSON.parse(localStorage.getItem("objectID"))
    if (localStorageTaskList) {
      this.setState({ taskList: localStorageTaskList })
      this.setState({ objectID: localStorageObjectID })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const taskListString = JSON.stringify(nextState.taskList)
    localStorage.setItem("taskList", taskListString)
    localStorage.setItem("objectID", (this.state.objectID + 1))
  }

  addTask(event) {
    event.preventDefault()
    this.setState({ objectID: (this.state.objectID + 1) })

    const newTask = {
      taskTitle: this.state.inputValue,
      objectID: this.state.objectID
    }

    const updatedTaskList = [...this.state.taskList]
    updatedTaskList.push(newTask)
    this.setState({ taskList: updatedTaskList, inputValue: "" })
  }

  removeTask(id) {
    const updatedTaskList = this.state.taskList.filter(item => item.objectID !== id)
    this.setState({ taskList: updatedTaskList })
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    return (
      <div className="task__list">
        <h1>Todo.</h1>
          <div className="task__add">
            <form onSubmit={(event) => this.addTask(event)}>
              <input
                type="text"
                value={this.state.inputValue}
                placeholder="What should I do next?"
                autoFocus="autofocus"
                onChange={(event) => this.updateInputValue(event)}
              />
              <button type="submit">
                <i className="fas fa-plus"></i>
              </button>
            </form>
          </div>
          {this.state.taskList.map(item =>
            <div className="task" key={item.objectID} onClick={() => this.removeTask(item.objectID)}>
              {item.taskTitle}
              <span className="task__mark">
                <p>Mark as done<i className="fas fa-check"></i></p>
              </span>
            </div>
          )}
      </div>
    );
  }

}

export default App;
