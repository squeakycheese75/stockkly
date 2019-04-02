import React from "react";

class PriceRequestForm extends React.Component {
  render() {
    return (
      <>
        <p>
          Send the details to me at:
          <a href="mailto:james_wooltorton@hotmail.com">email</a>
          include the name or id, exchange, variant, url, etc. I'll see if I can
          write a web crawler to pull the price.
        </p>
      </>
    );
  }
}
export default PriceRequestForm;
