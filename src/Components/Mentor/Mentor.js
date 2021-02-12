import React, { Component } from 'react';

class Mentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            taskList:[{taskName:""}]
        }
    }
    handleChangeUname = (e) => {
        this.setState({ name: e.target.value });
    }
     handleInputChange = (e, index) => {
        const { name,value} = e.target;
        const list = [...this.state.taskList];
        list[index][name] = value;
        this.setState({taskList:list})
      };
       
      handleRemoveClick = index => {
        const list = [...this.state.taskList];
        list.splice(index, 1);
        this.setState({taskList:list})
      };
       
      handleAddClick = () => {
        this.setState({taskList:[...this.state.taskList, { taskName: ""}]});
      };

    signup = (e) => {
        console.log("signup page",this.state)
        e.preventDefault();
        let paramObj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://localhost:8086/user/save', {
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
            if(data.success){
                console.log(data);
                alert("Successfully Signup");
            }else{
                alert("Sign Up Failed");
            }

        });
    }
    render() {
        return (
            <div>
                <div>
                    <form className="demoForm" onSubmit={this.signup}>
                        <div>

                        <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleChangeUname} className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                            <label>Task</label>
                            {this.state.taskList.map((task, index) => {
                                return   <div> <input type="text" value={task.name}  className="form-control" onChange={e => this.handleInputChange(e, index)} name={"task"+index} />
                                    {this.state.taskList.length !== 1 && <button className="btn btn-primary center" onClick={() => this.handleRemoveClick(index)}>Remove</button>}
                                    {this.state.taskList.length - 1 === index && <button className="btn btn-primary center" onClick={this.handleAddClick}>Add</button>}
                                </div>

                            })}
                            </div>
                            
                            <button type="submit" className="btn btn-primary center">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Mentor;