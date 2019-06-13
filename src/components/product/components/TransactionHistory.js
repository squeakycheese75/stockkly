import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function columnClassNameFormat(fieldValue) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size bstable"
    : "td-column-price-up td-column-size bstable";
}

function isoDateFormatter(cell, row) {
  // var d = new Date(cell);
  // return d.toLocaleString();
  return cell.split("T")[0];
}

class TransactionHistory extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.pid,
      // appSettings: this.props.appSettings,
      transactionHistoryData: []
    };
    this.auth = this.props.auth;
  }
  async loadTransactionHistory() {
    // console.log("calling loadTransactionHistory with " + this.state.pid);
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/wallet/transactions/" +
      this.state.pid;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response;
        throw new Error("Network response was not ok.");
      })
      .then(response => response.json())
      .then(response => {
        if (this._isMounted) {
          this.setState({
            transactionHistoryData: response
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadTransactionHistory();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // const { data } = this.props;

    const options = {
      noDataText: "No data.."
    };

    return (
      <div>
        <BootstrapTable
          data={this.state.transactionHistoryData}
          responsive
          striped
          bordered
          hover
          headerContainerClass="bstable bstable-header-bold"
          size="sm"
          version="4"
          options={options}
        >
          <TableHeaderColumn
            dataField="_id"
            isKey={true}
            columnClassName="bstable"
            width="20%"
            hidden={true}
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="transdate"
            columnClassName="bstable"
            dataSort={true}
            dataFormat={isoDateFormatter}
            width="20%"
          >
            DATE
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ticker"
            dataSort={true}
            columnClassName="bstable"
            width="20%"
          >
            PRODUCT
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="quantity"
            columnClassName={columnClassNameFormat}
            dataSort={true}
            width="20%"
            dataAlign="right"
          >
            QTY
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="price"
            dataSort={true}
            columnClassName="bstable"
            width="20%"
            dataAlign="right"
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="transtype"
            dataSort={true}
            columnClassName="bstable"
            width="20%"
            dataAlign="center"
          >
            TYPE
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TransactionHistory;
