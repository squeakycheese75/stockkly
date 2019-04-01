import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table-next";
import "./SortTable.css";
//import styles from "./sortTable-styles.js";

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  return fieldValue < 0
    ? "td-column-price-down td-column-size"
    : "td-column-price-up td-column-size";
}

function openFormatter(cell, row) {
  // if( !cell ) {
  //   return `+${row.symbol}` + (parseFloat(row.last) + parseFloat(row.change)).toFixed(2);
  // }
  // return `+${row.symbol}` + cell;
  if (!cell) {
    return (
      `${row.symbol}` +
      (parseFloat(row.last) + parseFloat(row.change))
        .toFixed(2)
        .toLocaleString()
    );
  }
  return `${row.symbol}` + cell.toLocaleString();
}

function priceChangeFormatter(cell, row) {
  var movement = (
    (parseFloat(row.change) / (parseFloat(row.last) + parseFloat(row.change))) *
    100
  ).toFixed(2);

  // return cell > 0
  //   ? `+${cell}<i class="material-icons vertical-align-middle">arrow_drop_up</i> (${movement}%)`
  //   : `${cell}<i class="material-icons vertical-align-middle">arrow_drop_down</i> (${movement}%)`;
  return (
    <div>
      <ul>
        <li className="name">{cell}</li>
        <li className="details">({movement}%)</li>
      </ul>
    </div>
  );
}

function nameFormatter(cell, row) {
  console.log("In nameFormatter with :", row);
  return (
    <div>
      <ul>
        <li className="name">{row.id}</li>
        <li className="details">{row.name}</li>
      </ul>
    </div>
  );
}

// function onSelectRow(row, isSelected, e) {
//   if (isSelected) {
//     alert(`You just selected '${row["name"]}'`);
//   }
// }

class SortTable extends Component {
  removeItem = index => {
    this.props.onSubmit(index);
  };

  removeButton(cell) {
    return (
      <i
        className="mdc-icon-button material-icons md-12 orange600"
        onClick={() => this.removeItem(cell)}
      >
        {/* highlight_off */}
        delete
      </i>
    );
  }

  render() {
    const { data } = this.props;

    const options = {
      onRowClick: function(row) {
        // alert(`You click row id: ${row._id}`);
        console.log(`You click row id: ${row.id}`);
      },
      noDataText: "Loading..."
    };
    // const selectRowProp = {
    //   mode: "checkbox",
    //   bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    //   hideSelectColumn: true, // enable hide selection column.
    //   clickToSelect: false // you should enable clickToSelect, otherwise, you can't select column.
    // };

    return (
      <div>
        <BootstrapTable
          data={data}
          headerContainerClass="bstable"
          striped
          hover
          condensed
          bordered
          size="sm"
          version="4"
          // selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn
            width="30%"
            dataField="id"
            isKey={true}
            dataSort={true}
            //bordered={true}
            columnClassName="bstable"
            dataFormat={nameFormatter}
          >
            NAME
          </TableHeaderColumn>
          {/* <TableHeaderColumn width='10%' dataField='sector'  dataSort={ true }  columnClassName= 'bstable'>Sector</TableHeaderColumn> */}
          <TableHeaderColumn
            width="17%"
            dataField="last"
            dataFormat={openFormatter}
            dataSort={true}
            columnClassName="bstable"
            // columnClassName="bstable bstable-header-bold"
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="17%"
            dataField="open"
            dataFormat={openFormatter}
            dataSort={true}
            columnClassName="bstable"
          >
            OPEN
          </TableHeaderColumn>
          <TableHeaderColumn
            width="17%"
            dataField="change"
            columnClassName={columnClassNameFormat}
            dataSort={true}
            dataFormat={priceChangeFormatter}
          >
            CHANGE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="5%"
            dataField="_id"
            columnClassName="bstable bstable-icon"
            dataAlign="center"
            dataFormat={this.removeButton.bind(this)}
          />
        </BootstrapTable>
      </div>
    );
  }
}
export default SortTable;
