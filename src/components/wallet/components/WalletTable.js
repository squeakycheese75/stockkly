import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withRouter } from "react-router-dom";
import "./WalletTable.css";

function qtyFormatter(cell, row) {
  return (
    <>
      {cell < 0 ? (
        <div className="down">
          {cell.toLocaleString("en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })}
        </div>
      ) : (
        <div className="flat">
          {cell.toLocaleString("en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })}
        </div>
      )}
    </>
  );
}

function nameFormatter(cell, row) {
  return (
    <div>
      <ul>
        <li className="name">{row.displayTicker}</li>
        <li className="details">{row.name}</li>
      </ul>
    </div>
  );
}

class WalletTable extends React.Component {
  render() {
    const { data, profile, history } = this.props;

    function priceFormatter(cell, row) {
      return row.spot === 1 ? (
        <div className="nameLarge">
          {row.symbol}
          {parseFloat(cell).toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      ) : (
        <div>
          <ul>
            <li className="nameSmall">
              {row.symbol}
              {parseFloat(cell).toLocaleString("en-GB", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </li>
            <li className="details">({row.spot.toFixed(2)})</li>
          </ul>
        </div>
      );
    }

    const openFormatterTotal = (cell, row) => {
      return (
        <div>
          <ul>
            <li className="nameSmall">
              {`${profile.symbol}` +
                // cell.toLocaleString(undefined, { minimumFractionDigits: 2 })
                parseFloat(cell).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
            </li>
            {row.total_change > 0 ? (
              <li className="details up">
                <i className="material-icons vertical-align-middle">
                  arrow_drop_up
                </i>
                {`(` +
                  // row.total_change.toFixed(2).toLocaleString()
                  parseFloat(row.total_change).toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) +
                  `)`}
              </li>
            ) : (
              <>
                {row.total_change < 0 ? (
                  <>
                    <li className="details down">
                      <i className="material-icons vertical-align-middle">
                        arrow_drop_down
                      </i>
                      {`(` +
                        // row.total_change.toFixed(2).toLocaleString()
                        parseFloat(row.total_change).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }) +
                        `)`}
                    </li>
                  </>
                ) : (
                  <>
                    <li className="details flat">
                      {`(` +
                        // row.total_change.toFixed(2).toLocaleString()
                        parseFloat(row.total_change).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }) +
                        `)`}
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      );
    };

    const options = {
      onRowClick: function(row) {
        history.push(`/product/${row.ticker}`);
      },
      noDataText: "Loading..."
    };
    const selectRowProp = {
      hideSelectColumn: true,
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(178,214,225)"
    };

    return (
      <div className="walletTable">
        <BootstrapTable
          data={data}
          striped
          condensed={false}
          hover={false}
          bordered={false}
          size="sm"
          version="4"
          headerContainerClass="bstable"
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn
            isKey={true}
            width="25%"
            dataField="ticker"
            columnClassName="bstable"
            dataFormat={nameFormatter}
            dataSort={true}
          >
            TICKER
          </TableHeaderColumn>
          <TableHeaderColumn
            width="10%"
            dataField="qty"
            dataAlign="right"
            columnClassName="bstable"
            headerAlign="right"
            dataSort={true}
            dataFormat={qtyFormatter}
          >
            QTY
          </TableHeaderColumn>
          <TableHeaderColumn
            width="25%"
            dataField="price"
            dataAlign="right"
            columnClassName="bstable"
            headerAlign="right"
            dataSort={true}
            dataFormat={priceFormatter}
          >
            PRICE
          </TableHeaderColumn>
          <TableHeaderColumn
            width="20%"
            dataField="total"
            dataAlign="right"
            columnClassName="bstable bstable-header-bold"
            headerAlign="right"
            dataSort={true}
            dataFormat={openFormatterTotal}
          >
            TOTAL
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default withRouter(WalletTable);
