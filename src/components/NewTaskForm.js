import React from "react";

class NewTaskForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      taskList: this.props.taskList,
      objectID: 0,
    }
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
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

  render() {
    return (
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
    )
  }
}

export default NewTaskForm;
