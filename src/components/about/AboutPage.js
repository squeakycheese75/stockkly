import React from "react";
import { Card } from "react-bootstrap";
// import LinkedInBadge from "./LinkedInBadge";
import styles from "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className={styles}>
      <Card border="dark">
        <Card.Header as="h5">What's new in version 0.2</Card.Header>
        <Card.Body>
          <Card.Text>
            <ul>
              <li>
                Added new Wallet function - including support for transactions
                and tracking.
              </li>
              <li>
                Streamlined refreshing issues. Now remembers logged in users for
                7 days!
              </li>
            </ul>
          </Card.Text>
          {/* <ul>
            <li>Added new Wallet function.</li>
            <li>Added support for transactions and tracking.</li>
            <li>
              Streamlined refreshing issues. Now remember logged in users for 7
              days!
            </li>
          </ul> */}
        </Card.Body>
      </Card>
      <Card border="dark">
        <Card.Header as="h5">About Me</Card.Header>
        {/* <Card.Img variant="left" src="./holder.js/100px180" /> */}
        <Card.Body>
          {/* <Card.Title>A little bit about the developer...</Card.Title> */}
          {/* <Card.Text> */}
          <p>
            I'm a freelance software engineer and digital nomad. Currently
            living and working from...<s>London</s>, <s>Berlin</s>,
            <s>Barcelona</s>, <s>Chamonix</s>, <s>Devon</s>, <s>Madrid</s>,
            <s>Santiago</s>, <s>Lima</s>, <s>Toronto</s>, Coimbra
          </p>
          <p>
            I built Stockkly as I wanted a mobile friendly, one-stop source for
            watching prices that I'm interested in.
          </p>
          <p>
            Feel free to <a href="mailto:james_wooltorton@hotmail.com">email</a>{" "}
            me with feedback/comments/suggestions.
          </p>
          <p>
            Or, for anyone wanting to get into building progressive web apps
            with React, checkout an early open source version of the app on
            GitHub.
          </p>
          <p>
            {" "}
            <a href="https://github.com/squeakycheese75">
              <img
                src="./images/github.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="GitHub"
              />{" "}
              GitHub
            </a>
          </p>
          {/* </Card.Text> */}
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
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
        // <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card> */}
    </div>
  );
};

export default AboutPage;
