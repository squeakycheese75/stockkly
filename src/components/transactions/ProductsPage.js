import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class ProductsPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadProducts().catch(error => {
      console.log("Loading Products failed ..." + error);
    });
  }

  render() {
    return (
      <>
        <h2>Products</h2>
        {this.props.products.map(product => (
          <div key={product.name}>{product.name}</div>
        ))}
      </>
    );
  }
}

ProductsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
