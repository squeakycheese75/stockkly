import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class WalletTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <BootstrapTable
          data={data}
          striped
          hover
          condensed
          bordered
          size="sm"
          version="4"
        >
          <TableHeaderColumn isKey={true} width="10%" dataField="ticker">
            NAME
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" dataField="name">
            NAME
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" dataField="total" dataAlign="center">
            TOTAL
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" dataField="price" dataAlign="center">
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="movement"
            dataAlign="center"
          >
            MOVE
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" dataField="spot" dataAlign="center">
            SPOT
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" dataField="change" dataAlign="center">
            CHANGE
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default WalletTable;
