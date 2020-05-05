import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import { withRouter } from "react-router-dom";

import "./TestTable.css";

class TestTable extends Component {
  render() {
    const { rows } = this.props;

    const defaultColumnProperties = {
      width: 160
    };

    const columns = [
      {
        key: "id",
        name: "ID"
      },
      {
        key: "firstName",
        name: "First Name"
      },
      {
        key: "lastName",
        name: "Last Name"
      },
      {
        key: "jobTitle",
        name: "Job Title"
      },
      {
        key: "jobArea",
        name: "Job Area"
      },
      {
        key: "jobType",
        name: "Job Type"
      },
      {
        key: "email",
        name: "Email"
      },
      {
        key: "street",
        name: "Street"
      },
      {
        key: "zipCode",
        name: "ZipCode"
      },
      {
        key: "date",
        name: "Date"
      },
      {
        key: "catchPhrase",
        name: "Catch Phrase"
      }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    const ROW_COUNT = 50;
    const ROW_HEIGHT = 200;

    const Panel = ({ title, children }) => {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">{title}</div>
          <div className="panel-body">{children}</div>
        </div>
      );
    };

    const Contact = ({
      firstName,
      lastName,
      companyName,
      jobTitle,
      email,
      phone
    }) => {
      return (
        <div style={{ paddingLeft: "150px" }}>
          <address>
            <strong>
              {firstName} {lastName}
            </strong>
            <br />
            {jobTitle}
            <br />
            {companyName}
            <br />
            <abbr title="Phone">P:</abbr> {phone}
            <br />
            <a href="mailto:#">{email}</a>
          </address>
        </div>
      );
    };
    const RowRenderer = ({ row, idx }) => {
      const { firstName, lastName } = row;
      return (
        <Panel title={`${firstName} ${lastName}`}>
          <img src={row.avatar} className="pull-left" />
          <Contact {...row} />
        </Panel>
      );
    };
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => rows[i]}
          rowsCount={ROW_COUNT}
          minHeight={650}
          rowRenderer={RowRenderer}
          rowHeight={ROW_HEIGHT}
          headerRowHeight={50}
          enableCellAutoFocus={false}
        />
      </div>
    );
  }
}

export default withRouter(TestTable);
