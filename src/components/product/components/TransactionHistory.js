import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function columnClassNameFormat(fieldValue) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size bstable"
    : "td-column-price-up td-column-size bstable";
}

class TransactionHistory extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.productId,
      message: ""
    };
    this.auth = this.props.auth;
  }

  loadTransactionHistory() {
    var url =
      process.env["REACT_APP_PRICES_API"] +
      "/api/private/transactions/" +
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
            transactionHistoryData: response.message
          });
        }
      })
      // .then(response => {
      //   this.setState({
      //     transactionHistoryData: response.message
      //   });
      // })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.auth.isAuthenticated()) {
      this.loadTransactionHistory();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const options = {
      noDataText: "No data.."
    };

    return (
      <div>
        <BootstrapTable
          data={this.state.data}
          // responsive
          striped
          bordered
          hover
          headerContainerClass="bstable bstable-header-bold"
          size="sm"
          version="4"
          options={options}
        >
          <TableHeaderColumn
            dataField="id"
            isKey
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
            width="20%"
          >
            DATE
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="quantity"
            columnClassName={columnClassNameFormat}
            dataSort={true}
            width="20%"
          >
            QTY
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="price"
            dataSort={true}
            columnClassName="bstable"
            width="20%"
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="transtype"
            dataSort={true}
            columnClassName="bstable"
            width="20%"
          >
            TYPE
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TransactionHistory;
