import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './AboutPage.css';

const AboutPage = () => {
  return (
    <div className={styles}>
      <Card border="dark">
        <Card.Header as="h5">What&apos;s new in version 0.2</Card.Header>
        <Card.Body>
          <p>
            Added new Wallet function - including support for transactions and
            wealth tracking
          </p>
          <p>
            Streamlined refreshing issues. Now remembers logged in users for 7
            days!
          </p>
          <p>Lots of backend squirelling to make things go smoother.</p>
        </Card.Body>
      </Card>
      <Card border="dark">
        <Card.Header as="h5">About Me</Card.Header>
        {/* <Card.Img variant="left" src="./holder.js/100px180" /> */}
        <Card.Body>
          {/* <Card.Title>A little bit about the developer...</Card.Title> */}
          {/* <Card.Text> */}
          <p>
            I&apos;m a freelance software engineer and digital nomad. Currently
            living and working from...<s>London</s>, <s>Berlin</s>,
            <s>Barcelona</s>, <s>Chamonix</s>, <s>Devon</s>, <s>Madrid</s>,
            <s>Santiago</s>, <s>Lima</s>, <s>Toronto</s>, <s>Coimbra</s>,{' '}
            <s>Aviero</s>, <s>Vancouver</s>, <s> London</s>, <s>Berlin</s>,
            Edinburgh.
          </p>
          <p>
            I built Stockkly as I wanted a mobile friendly, one-stop source for
            watching prices that I&apos;m interested in.
          </p>
          <p>
            Feel free to <a href="mailto:james_wooltorton@hotmail.com">email</a>{' '}
            me with feedback/comments/suggestions.
          </p>
          <p>
            Or, for anyone wanting to get into building progressive web apps
            with React, checkout an early open source version of the app on
            GitHub.
          </p>
          <p>
            {' '}
            <a href="https://github.com/squeakycheese75">
              <img
                src="./images/github.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="GitHub"
              />{' '}
              GitHub
            </a>
          </p>
          {/* </Card.Text> */}
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </div>
  );
};

export default AboutPage;
