import React, { useState } from "react";
import { Collapse, Container } from "react-bootstrap";

const TestComponent = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <button
          className="btn btn-link float-right"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <i className="material-icons">arrow_drop_up</i>
          ) : (
            <i className="material-icons">arrow_drop_down_circle</i>
          )}
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
