import React, { Component } from 'react';

const taskList = [
  {
    taskTitle: 'Climb Everest',
    done: false,
    objectID: 0,
  },
  {
    taskTitle: 'Go to Canada',
    done: false,
    objectID: 1,
  },
  {
    taskTitle: 'Get a PVT',
    done: true,
    objectID: 2,
  },
  {
    taskTitle: 'Watch "Merue" movie',
    done: true,
    objectID: 3,
  },
]

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskList,
      finishedTasks : [],
      comingTasks : [],
    }

    this.finishTask = this.finishTask.bind(this)
  }

  updateTaskList() {
    const finishedTasks = taskList.filter(item => item.done === false)
    this.setState({ finishedTasks })
    const comingTasks = taskList.filter(item => item.done !== false)
    this.setState({ comingTasks })
    console.log(this.state.finishedTasks)
    console.log(this.state.comingTasks)
  }

  deleteTask(id) {
    const updatedTaskList = this.state.taskList.filter(item => item.objectID !== id)
    this.setState({ taskList: updatedTaskList })
  }

  finishTask(id) {
    const selectedTask = taskList.find(item => item.objectID === id)
    selectedTask.done = true
    // updateTaskList()
    console.log(selectedTask)
  }

  render() {
    return (
      <div className="todo">
        <h2>Todo</h2>
          {this.state.comingTasks.map(item =>
            <div className="task" key={item.objectID}>
              <span className="deleteTask">
                <button type="button" onClick={() => this.deleteTask(item.objectID)}>
                  <i className="fas fa-times"></i>
                </button>
              </span>
              {item.taskTitle}
              <span className="finishTask">
                <button type="button" onClick={() => this.finishTask(item.objectID)}>
                  <i className="fas fa-check"></i>
                </button>
              </span>
              <p>{item.done === true ? "done" : "to be done"}</p>
            </div>
          )}
          <div className="addTask">
            <form>
              <input type="text" placeholder="What should I do next?" />
              <button type="button">
                <i className="fas fa-plus"></i>
              </button>
            </form>
          </div>

          <h2>Done</h2>
      </div>
    );
  }

}

export default App;
