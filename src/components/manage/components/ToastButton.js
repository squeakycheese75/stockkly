import React, { Component } from "react";
// import { Button } from "react-bootstrap";
// import { withToastManager } from "react-toast-notifications";

class ToastButton extends Component {
  addItem(index) {
    console.log(index);
    this.props.onClick(index);
  }

  render() {
    const { content, toastManager } = this.props;

    return (
      <>
        <i
          className="mdc-icon-button material-icons md-12 orange600"
          onClick={() => {
            toastManager.add("Successfully added " + content + "!", {
              appearance: "success",
              autoDismiss: true
            });
            this.addItem(content);
          }}
        >
          add_circle
        </i>
      </>
    );
  }
}
export default ToastButton;
