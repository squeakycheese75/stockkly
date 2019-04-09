import React from "react";
// import { Card, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const LoginReminder = () => {
  return (
    <div>
      {/* <Card className="text-center" border="primary">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card> */}
      <Alert key="warning" variant="warning">
        <p>* You need to be logged in to remember your favourite prices.</p>
      </Alert>
    </div>
  );
};

export default LoginReminder;
