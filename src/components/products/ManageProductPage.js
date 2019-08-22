import React, { useEffect } from "react";
import { connect } from "react-redux";
// import * as transactionActions from "../../redux/actions/transactionActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
// import ProductForm from "./ProductForm";
import Loading from "../common/Loading";
// import { toast } from "react-toastify";
import ProductList from "./ProductList";
// import ProductTable from "./ProductTable";

const newProduct = {
  id: null
};

function ManageProductPage({ products, loadProducts, history, ...props }) {
  // const [product, setProduct] = useState({ ...props.product });
  //   const [errors, setErrors] = useState({});
  //   const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }
    // eslint-disable-next-line
  }, [props.product]);

  return products.length === 0 ? (
    <Loading />
  ) : (
    <>
      {/* <h1>Products</h1> */}
      <ProductList products={products} />
      {/* <ProductTable data={products} /> */}
    </>
  );
}

ManageProductPage.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export function getProductByTicker(products, ticker) {
  return products.find(product => product.ticker === ticker) || null;
}

function mapStateToProps(state, ownProps) {
  const ticker = ownProps.match.params.ticker;
  const product =
    ticker && state.products.length > 0
      ? getProductByTicker(state.products, ticker)
      : newProduct;
  return {
    product,
    products: state.products
  };
}

const mapDispatchToProps = {
  loadProducts: productActions.loadProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
