// React
import React from "react";

// Libraries
import DatePicker from "react-datepicker";
import moment from "moment";

// CSS
import "./new-task-form.css"

class NewTaskForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      inputValue: this.props.inputValue,
      startDate: moment(),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    return (
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
    )
  }
}

export default NewTaskForm;
