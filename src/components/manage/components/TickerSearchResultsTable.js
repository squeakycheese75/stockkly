import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withToastManager } from "react-toast-notifications";
// import { ToastButtonWrapper } from "./ToastButtonWrapper";
import ToastButton from "./ToastButton";

// const FormWithToasts = withToastManager(ToastButtonWrapper);

var FormWithToasts = withToastManager(ToastButton);

function msg() {
  return (
    <Alert size="sm">
      Woah, no results! Maybe a typo? Are you already watching that price? Or I
      might not have that price yet. Feel free to drop me an email to request a
      price you'd like!
    </Alert>
  );
}
// consts = ToastDemo;

class TickerSearchResultsTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  addItem(index) {
    console.log(index);
    this.props.onSubmit(index);
  }

  addButton(cell) {
    return (
      // <i
      //   className="mdc-icon-button material-icons md-12 orange600"
      //   onClick={() => this.addItem(cell)}
      // >
      //   add_circle
      // </i>
      <>
        <FormWithToasts content={cell} onClick={() => this.addItem(cell)} />
        {/* </ToastProvider> */}
        {/* <i
          className="mdc-icon-button material-icons md-12 orange600"
          onClick={() => {
            this.addItem(cell);
            alert(`You added: ${cell}`);
          }}
        >add_circle</i> */}
      </>
    );
  }
  render() {
    const { data } = this.props;
    const options = {
      onRowClick: function(row) {
        // alert(`You click row id: ${row._id}`);
        // console.log(`You clicked row id: ${row.ticker}`);
      },
      noDataText: msg()
    };

    return (
      <div className="searchtable">
        <BootstrapTable
          // ref="table"
          data={data}
          headerContainerClass="bstable bstable-header-bold"
          responsive
          striped
          bordered
          hover
          search
          pagination
          size="sm"
          version="4"
          options={options}
        >
          <TableHeaderColumn
            width="30%"
            dataField="id"
            isKey={true}
            dataSort={true}
            columnClassName="bstable"
          >
            Symbol
          </TableHeaderColumn>
          <TableHeaderColumn
            width="60%"
            dataField="name"
            dataSort={true}
            columnClassName="bstable"
          >
            Name
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='20%' dataField='ticker' dataFormat={this.cellButton.bind(this)}>Add</TableHeaderColumn>                            */}
          <TableHeaderColumn
            width="10%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.addButton.bind(this)}
          />
        </BootstrapTable>
      </div>
    );
  }
}

export default TickerSearchResultsTable;
