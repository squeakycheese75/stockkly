import React, { Component } from "react";
import styles from "./Header.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./icon_48.png";

class Header extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <div className={styles}>
        <Navbar collapseOnSelect={true} expand="sm" bg="primary" variant="dark">
          <LinkContainer to="/">
            <Navbar.Brand className="header">
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
                    <Button>Portfolio</Button>
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/watching">
                <Nav.Link>
                  <Button>WatchList</Button>
                </Nav.Link>
              </LinkContainer>
              {isAuthenticated() && (
                <LinkContainer to="/transactions">
                  <Nav.Link>
                    <Button>Transactions</Button>
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/products">
                <Nav.Link>
                  <Button>Find</Button>
                  {/* <i className="mdc-icon-button material-icons md-24">
                      add_circle
                    </i> */}
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav pullright="true">
              {isAuthenticated() && (
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <Button size="sm">Profile</Button>
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="login">
                <Nav.Link>
                  <Button
                    className={styles}
                    variant="outline-light"
                    size="sm"
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
