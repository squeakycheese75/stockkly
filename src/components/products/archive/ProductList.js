import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing(3),
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 650
//   }
// }));

// const classes = useStyles();

const ProductList = ({ products }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Ticker</th>
        <th>Name</th>
        <th>Exchange</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {products.map(product => {
        return (
          <tr key={product.id}>
            <td>
              <Link to={"/product/" + product.ticker}>{product.name}</Link>
            </td>
            <td>{product.ticker}</td>
            <td>{product.name}</td>
            <td>{product.exchange}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  // <Paper className="root">
  //   <Table className="table">
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>Ticker</TableCell>
  //         <TableCell align="right">Name</TableCell>
  //         <TableCell align="right">Exchange</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {products.map(product => (
  //         <TableRow key={product.name}>
  //           <TableCell component="th" scope="row">
  //             {product.name}
  //           </TableCell>
  //           <TableCell align="right">{product.ticker}</TableCell>
  //           <TableCell align="right">{product.exchange}</TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </Paper>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
