import React, { Component } from "react";
import { Alert, ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withToastManager } from "react-toast-notifications";
import ToastButton from "./ToastButton";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import ProductForm from "./ProductForm";

var FormWithToasts = withToastManager(ToastButton);

function msg() {
  return (
    <Alert size="sm">
      Woah, no results! Maybe a typo? Feel free to drop me an email to request a
      price you'd like!
    </Alert>
  );
}

// function onSelectRow(row, isSelected, e) {
//   if (isSelected) {
//     // alert(`You just selected '${row["name"]}'`);
//   }
// }

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
      <>
        <FormWithToasts content={cell} onClick={() => this.addItem(cell)} />
      </>
    );
  }

  viewProductHelp(cell, row) {
    return (
      <ButtonToolbar>
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Details</Tooltip>}
        >
          <Link to={`/product/${cell.toString().toUpperCase()}`}>
            <i className="mdc-icon-button material-icons md-12 orange600">
              view_headline
            </i>
          </Link>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }

  render() {
    const { data, history } = this.props;

    // const options = {
    //   noDataText: msg()
    //   // onRowClick: function(row) {
    //   //   // alert(`You click row id: ${row._id}`);
    //   //   // console.log(`You clicked row id: ${row.ticker}`);
    //   //   // <Link to={`/product/${row}`} />;
    //   //   this.router.transitionTo(`/product/${row.id}`);
    //   // },
    // };
    // const selectRowProps = {
    //   mode: "radio",
    //   clickToSelect: true,
    //   onSelect: onSelectRow,
    //   hideSelectColumn: true
    // };

    // row.total_change
    const options = {
      onRowClick: function(row) {
        history.push(`/product/${row.ticker.toString().toUpperCase()}`);
      },
      noDataText: msg()
    };
    const selectRowProps = {
      hideSelectColumn: true,
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(178,214,225)"
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
          // selectRow={selectRowProps}
          selectRow={selectRowProps}
        >
          <TableHeaderColumn
            width="30%"
            dataField="displayTicker"
            isKey
            dataSort={true}
            columnClassName="bstable"
          >
            Ticker
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="name"
            dataSort={true}
            columnClassName="bstable"
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="exchange"
            dataSort={true}
            columnClassName="bstable"
          >
            Exchange
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='20%' dataField='ticker' dataFormat={this.cellButton.bind(this)}>Add</TableHeaderColumn>                            */}
          {/* <TableHeaderColumn
            width="5%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.viewProductHelp.bind(this)}
          />
          <TableHeaderColumn
            width="5%"
            dataField="ticker"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.addButton.bind(this)}
          /> */}
        </BootstrapTable>
      </div>
    );
  }
}

export default withRouter(TickerSearchResultsTable);
