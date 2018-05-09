// React
import React from "react"

// Components
import Header from "../Header/Header"

// Libraries
import DatePicker from "react-datepicker"
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      inputValue: "",
      objectID: 0,
      startDate: moment(),
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
      <div id="wrapperGlobal">
        <Header />
        <section id="task__list">
          <div className="task__wrapper">
            <form onSubmit={(event) => this.addTask(event)} className="task__form">
              <input
                type="text"
                value={this.state.inputValue}
                placeholder="What should I do next?"
                required
                onChange={(event) => this.updateInputValue(event)}
                className="input--task-title"
                />
              <DatePicker selected={this.state.startDate} onChange={this.handleChange} className="input--date" />
              <button type="submit" className="task__button">
                <i className="fas fa-plus"></i>
              </button>
            </form>
            {this.state.taskList.map(item =>
              <div className="task" key={item.objectID} onClick={() => this.removeTask(item.objectID)}>
                {item.taskTitle}
                <span className="task__mark">
                  <p><i className="fas fa-check"></i></p>
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

}

export default App;
