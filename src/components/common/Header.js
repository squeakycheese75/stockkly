import React, { Component } from "react";
import styles from "./Header.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import styles from "./Header.css";
import logo from "./icon_256.png";

class Header extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div className={styles}>
        <Navbar collapseOnSelect={true} expand="sm" bg="primary" variant="dark">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {" T O C K K L Y"}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navbar-nav mr-auto">
              {isAuthenticated() && (
                <LinkContainer to="/wallet">
                  <Nav.Link>
                    <Button>Wallet</Button>
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* <LinkContainer to="/pricing">
                <Nav.Link>
                  <Button>Pricing</Button>
                </Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/watching">
                <Nav.Link>
                  <Button>WatchList</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/manage">
                <Nav.Link>
                  <Button>Find</Button>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link>
                  <Button>About</Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav pullright="true">
              {/* {isAuthenticated() && (
                <LinkContainer to="profile">
                  <Nav.Link>
                    <Button>Profle</Button>
                  </Nav.Link>
                </LinkContainer>
              )} */}
              <LinkContainer to="login">
                <Nav.Link>
                  <Button
                    className={styles}
                    variant="outline-light"
                    onClick={isAuthenticated() ? logout : login}
                  >
                    {isAuthenticated() ? "Log Out" : "Log In"}
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
