import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Callback from './Callback';
// import HomePage from './components/home/HomePage';
// import ProductsPage from './components/products/ProductsPage';
// import ProductPage from './components/products/ProductPage';
// import TransactionsPage from './components/transactions/TransactionsPage';
// import ManageTransactionPage from './components/transactions/ManageTransactionPage';
// import WalletPage from './components/wallet/WalletPage';
import WatchListPage from './components/watchlist/WatchlistPage';
// import ProfilePage from './components/profile/ProfilePage';
// import WalletTrackerPage from './components/wallet/WalletTrackerPage';

const Routes = (props, auth) => (
   <Switch>
     <Route path="/watching" component={App} ></Route>
     <Route
     path="/watching"
     render={(props) => <WatchListPage auth={this.auth} {...props} />}
   />
   {/* <Route
     exact
     path="/"
     render={(props) =>
       this.props.isAuthenticated ? (
         <WalletPage
           auth={this.auth}
           appSettings={this.props.appSettings}
           {...props}
         />
       ) : this.state.isLoaded ? (
         <HomePage auth={this.auth} {...props} />
       ) : (
         <Loading />
       )
     }
   />
   <Route
     path="/callback"
     render={(props) => <Callback auth={this.auth} {...props} />}
   />

   <Route
     exact
     path="/transactions"
     render={(props) => <TransactionsPage auth={this.auth} {...props} />}
   />
   <Route
     path="/transaction/:id"
     render={(props) => (
       <ManageTransactionPage auth={this.auth} {...props} />
     )}
   />
   <Route
     exact
     path="/transaction"
     render={(props) => (
       <ManageTransactionPage auth={this.auth} {...props} />
     )}
   />
   <Route
     path="/products"
     render={(props) => <ProductsPage auth={this.auth} {...props} />}
   />
   <Route
     path="/product/:ticker"
     render={(props) => <ProductPage auth={this.auth} {...props} />}
   />

   <Route
     path="/profile"
     render={(props) => <ProfilePage auth={this.auth} {...props} />}
   />
   <Route
     path="/wallet"
     render={(props) => <WalletPage auth={this.auth} {...props} />}
   />
   <Route
     path="/wallettracker"
     render={(props) => (
       <WalletTrackerPage auth={this.auth} {...props} />
     )}
   /> */}
  
 </Switch>
);

export default Routes;
