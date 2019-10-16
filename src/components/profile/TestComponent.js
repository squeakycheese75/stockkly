import React, { useState } from "react";
import { Collapse, Container } from "react-bootstrap";
// import styles from "./TestComponent.css";

const TestComponent = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        {/* <Button
          className="float-right"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          //   style={styles}
        >
          <i className="material-icons">arrow_drop_down</i>
        </Button> */}

        <button
          className="btn btn-link float-right"
          // className="btn btn-outline-danger"
          //   size="medium"
          onClick={() => setOpen(!open)}
        >
          <i className="material-icons">arrow_drop_down</i>
        </button>

        <Collapse in={open}>
          <div id="example-collapse-text">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
      </Container>
    </>
  );
};

export default TestComponent;
