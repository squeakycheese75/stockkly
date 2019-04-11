import React from "react";
import ProductChart from "./components/ProductChart";
import AddTransaction from "./components/AddTransaction";
import TransactionHistory from "./components/TransactionHistory";
import { Card } from "react-bootstrap";

class ProductForm extends React.Component {
  render() {
    const {
      match: { params }
    } = this.props;

    return (
      <div>
        <Card>
          <Card.Header>
            <h5>Product Info: {params["pid"]}</h5>
          </Card.Header>
          <ProductChart productId={params["pid"]} />
        </Card>
        <br />
        <Card>
          <Card.Header>
            <h3>Transaction History:</h3>
          </Card.Header>
          <TransactionHistory />
        </Card>
        <Card>
          <Card.Header>
            <h3>Add Transaction:</h3>
          </Card.Header>
          <AddTransaction />
        </Card>
      </div>
    );
  }
}

// const ProductForm = props => {
//   const {
//     match: { params }
//   } = props;
//   // this.state = {
//   //   open: false,
//   // };
//   return (
//     <div>
//       <Card>
//         <Card.Header>
//           <h5>Product Info: {params["pid"]}</h5>
//         </Card.Header>
//         <ProductChart productId={params["pid"]} />
//       </Card>
//       <br />
//       <Card>
//         <Card.Header>
//           <h3>Transaction History:</h3>
//         </Card.Header>
//         <TransactionHistory />
//       </Card>
//       <Card>
//         <Card.Header>
//           <h3>Add Transaction:</h3>
//         </Card.Header>
//         <AddTransaction />
//       </Card>
//     </div>
//   );
// };

export default ProductForm;
