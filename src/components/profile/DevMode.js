import React from "react";
import { Container } from "react-bootstrap";
import styles from "./ProfileForm.css";

const DevMode = ({ profile }) => {
  const { innerWidth: width, innerHeight: height } = window;
  return (
    <>
      {profile.devmode ? (
        <div className={styles}>
          <Container className="App">
            <form className="form">
              <h2>Screen Info:</h2>
              <h6>
                <>
                  <p>Width: {width}</p>
                  <p>Height: {height}</p>
                </>
              </h6>
            </form>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DevMode;
