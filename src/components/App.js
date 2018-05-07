import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputValue: "",
      objectID: 0,
    }
  }

  addTask(event) {
    this.setState({ objectID: this.state.objectID += 1 })

    const newTask = {
      taskTitle: this.state.inputValue,
      objectID: this.state.objectID
    }

    const updatedTaskList = [...this.state.taskList]
    updatedTaskList.push(newTask)
    this.setState({ taskList: updatedTaskList, inputValue: "" })
  }

  finishTask(id) {
    const updatedTaskList = this.state.taskList.filter(item => item.objectID !== id)
    this.setState({ taskList: updatedTaskList })
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
    console.log(this.state.inputValue)
  }

  render() {
    return (
      <div className="task__list">
        <h1>Todo</h1>
          <div className="task__add">
            <form>
              <input
                type="text"
                value={this.state.inputValue}
                placeholder="What should I do next?"
                onChange={(event) => this.updateInputValue(event)}
              />
              <button type="button" onClick={(event) => this.addTask()}>
                <i className="fas fa-plus"></i>
              </button>
            </form>
          </div>
          {this.state.taskList.map(item =>
            <div className="task" key={item.objectID} onClick={() => this.finishTask(item.objectID)}>
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
