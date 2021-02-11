import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    handleChangeUname = (e) => {
        this.setState({ name: e.target.value });
    }
    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handleChangePass = (e) => {
        this.setState({ password: e.target.value })
    }

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
                                <label>Email</label>
                                <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" name="email" />
                            </div>
                            <div className="form-group">
                                <label className="">password</label>
                                <input type="password" value={this.state.password} onChange={this.handleChangePass} className="form-control" name="password" />
                            </div>
                            <button type="submit" className="btn btn-primary center">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;