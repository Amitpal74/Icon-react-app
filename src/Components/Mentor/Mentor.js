import React, { Component } from 'react';
import './Mentor.css';
class Mentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            taskList: [""],
            mentorList: []
        }
    }

    componentDidMount() {
        this.getMentorList();
    }
    handleChangeUname = (e) => {
        this.setState({ name: e.target.value });
    }
    handleInputChange = (e, index) => {
        console.log("e.target", e.target.value, e.target.name, this.state.taskList);
        const { value } = e.target;
        const list = [...this.state.taskList];
        list[index] = value;
        this.setState({ taskList: list })
    };

    handleRemoveClick = index => {
        const list = [...this.state.taskList];
        list.splice(index, 1);
        this.setState({ taskList: list })
    };

    handleAddClick = () => {
        this.setState({ taskList: [...this.state.taskList, ""] });
    };

    getMentorList = () => {
        fetch('http://localhost:8086/mentor/getList', {
            crossDomain: true,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data)
            this.setState({ mentorList: data });

        }).catch(err => {
            console.log("error")
        });
    }

    submitForm = (e) => {
        console.log("signup page", this.state)
        e.preventDefault();
        let paramObj = {
            name: this.state.name,
            tasks: this.state.taskList
        }
        fetch('http://localhost:8086/mentor/save', {
            crossDomain: true,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paramObj)
        }).then((response) => {
            return response.json();
        }).then(data => {
            this.getMentorList();
        }).catch(err => {
            console.log("error")
        });
    }

    getMentor = (name) => {
        console.log("get mentor", name);
        let paramObj = {
            name: name
        }
        fetch('http://localhost:8086/mentor/getMentor', {
            crossDomain: true,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paramObj)
        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log("succes data", data);
            this.setState({ name: data.name, taskList: data.tasks });
        }).catch(err => {
            console.log("error")
        });
    }
    render() {
        return (
            <div className="form-container">

                <div className="add-mentor">
                    <div className="header-text">Add Mentor</div>
                    <form className="demoForm add-mentor-form" onSubmit={this.submitForm}>
                        <div>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleChangeUname} className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                                <label>Task</label>
                                {this.state.taskList && this.state.taskList.map((task, index) => {
                                    return <div>
                                        <div className="tasks-div">
                                            <input type="text" value={task} className="form-control mr-4" onChange={e => this.handleInputChange(e, index)} name={"task" + index} />
                                            {this.state.taskList.length !== 1 && <button className="btn btn-primary center" onClick={() => this.handleRemoveClick(index)}>Remove</button>}
                                        </div>
                                        {this.state.taskList.length - 1 === index && <button className="btn btn-primary center" onClick={this.handleAddClick}>Add</button>}
                                    </div>

                                })}
                            </div>

                            <button type="submit" className="btn btn-primary center">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="mt-4">
                    <div className="header-text">Mentor List</div>
                    {this.state.mentorList && this.state.mentorList.map((mentor) => {
                        return <div className="edit-div">
                            {mentor.name}<button className="btn btn-primary center edit-button " onClick={() => this.getMentor(mentor.name)}>Edit</button>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Mentor;