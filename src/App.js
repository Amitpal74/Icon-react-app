import React from 'react';
import './App.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Mentor from './Components/Mentor/Mentor';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      loginStatus:false
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onClickLogin = (status) =>{
    this.state({loginStatus : status});
  }

  render(){
    let loginStatus = localStorage.getItem("login") ? true :false;
    return (
     <div>
       {loginStatus ? <Mentor />
       :<div className="backgroundLogin">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2') }}
            >
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <Login onClickLogin={this.onClickLogin}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <SignUp />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div> }
     </div> 
    );
  }
  
}

export default App;
