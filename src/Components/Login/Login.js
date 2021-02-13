import React, { Component } from "react";
import {Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }


    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handleChangePass = (e) => {
        this.setState({ password: e.target.value })
    }

    login = (e) => {
        e.preventDefault();
        console.log("state", this.state);
        let paramObj = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://localhost:8086/login', {
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
                localStorage.setItem("login",true);
                localStorage.setItem("name",data.data.person.name);
                this.props.onClickLogin(true);
            }else{
                alert("Login Failed");
            }

        });

    }

    render() {
        return (
            <div className="row justify-content-center">
        <Form className="form" onSubmit={(e) => this.login(e)}>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={this.state.email} 
                onChange={this.handleChangeEmail}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={this.state.password} 
                onChange={this.handleChangePass}
              />
            </FormGroup>
          </Col>
          <Button>Login</Button>
        </Form>
      </div>
        );
    }
}

export default Login;