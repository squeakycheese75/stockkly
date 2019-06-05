import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/common/Header";
import AboutPage from "./components/about/AboutPage";
import ManagePage from "./components/manage/ManagePage";
// import PricingPage from "./components/tickers/PricingPage";
import Auth from "./components/auth/Auth";
import Loading from "./components/common/Loading";
// import NotFound from "./components/common/NotFound";
import Callback from "./Callback";
import HomePage from "./components/home/HomePage";
import { ToastProvider } from "react-toast-notifications";
import ProductForm from "./components/product/ProductPage";
import TransactionsPage from "./components/product/TransactionsPage";
import WalletPage from "./components/wallet/WalletPage";
import WatchListPage from "./components/watcher/WatchListPage";

//should all be done by service discovery - consul
// const defaultTickersList = ["MSFT"];

//require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  state = {
    isLoaded: false,
    hasError: false,
    // subscribedTickers: defaultTickersList,
    data: [],
    // user: {
    //   settings: {
    //     refresh: "30"
    //   }
    // },
    tickers: [],
    exchanges: [],
    sectors: [],
    filteredTickers: [],
    tokenRenewalComplete: false,
    appSettings: {
      currency: "GBP",
      symbol: "£",
      refreshRate: 30
    }
  };

  //Load component data
  // fetchTickers = () => {
  //   var url = process.env["REACT_APP_PRICES_API"] + "/tickers/";
  //   // console.log("fetchTickers fetching: ", url);
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(allTickers => {
  //       this.setState({
  //         tickers: allTickers
  //       });
  //       //Might not setstate here
  //     }) //.then(console.log('done'))
  //     .then(res => this.determineUniqueSectors());
  // };

  // determineUniqueSectors = () => {
  //   const sectors = this.state.tickers
  //     ? Array.from(new Set(this.state.tickers.map(t => t.sector)))
  //     : [];
  //   sectors.unshift(null);
  //   this.setState({ sectors: sectors });
  // };

  // filteredTickers = input => {
  //   const filteredTickers = this.state.tickers.filter(h => h.sector === input);
  //   const filterSUbscribedTickers = filteredTickers.filter(
  //     id => !this.state.subscribedTickers.includes(id.ticker)
  //   );
  //   this.setState({ filteredTickers: filterSUbscribedTickers });
  //   this.setState({ selectedSector: input });
  // };

  componentWillMount() {
    // this.fetchTickers();
  }

  componentDidMount() {
    this.auth.renewToken(() => this.setState({ tokenRenewalComplete: true }));

    // if (this.auth.isAuthenticated()) {
    //   this.authenticatedLoad();
    // } else {
    //   this.loadData();
    // }
    // // this.setState({ loading: false });
    // var refreshRate = this.state.appSettings.refreshRate * 1000;
    // setInterval(() => this.loadData(), refreshRate);
    //this.loadData(); // also load one immediately
  }

  // authenticatedLoad() {
  //   var url = process.env["REACT_APP_PRICES_API"] + "/api/private/profile";
  //   fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (response.ok) return response;
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({
  //         subscribedTickers: !response.message
  //           ? [defaultTickersList]
  //           : response.message
  //       });
  //     })
  //     .then(response => this.loadData())
  //     .catch(error => {
  //       this.setState({
  //         message: error.message
  //       });
  //     });
  // }

  componentDidCatch(error, info) {
    // this.setState({ hasError: true });
    // console.log(error, info);
  }

  loadData() {
    //console.log("In loading data!");
    // if (
    //   Array.isArray(this.state.subscribedTickers) ||
    //   this.state.subscribedTickers.length
    // ) {
    //   // array does not exist, is not an array, or is empty
    //   this.fetchDataWithTicker();
    // }
  }

  // async fetchDataWithTicker() {
  //   var url =
  //     process.env["REACT_APP_PRICES_API"] +
  //     "/pricing/" +
  //     this.state.subscribedTickers.join(",");
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           data: result
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // }

  // addNewTicker = input => {
  //   if (input) {
  //     //Check it's not already in the list
  //     var resval = this.state.subscribedTickers.some(item => input === item);
  //     if (!resval) {
  //       this.setState(
  //         prevState => ({
  //           subscribedTickers: prevState.subscribedTickers.concat(input)
  //         }),
  //         () => {
  //           //Reload data in callback.
  //           this.loadData();
  //           console.log(
  //             "calling this.filteredTickers with ",
  //             this.state.selectedSector
  //           );
  //           this.filteredTickers(this.state.selectedSector);
  //         }
  //       );
  //     }
  //   }

  //   if (this.auth.isAuthenticated()) {
  //     this.authorisedTickerCall("POST", input);
  //   }
  // };

  // authorisedTickerCall(method, ticker) {
  //   var data = { ticker: ticker };
  //   //fetch("http://localhost:5000/api/private/tickers", {
  //   var url = process.env["REACT_APP_PRICES_API"] + "/api/private/tickers";
  //   fetch(url, {
  //     method: method,
  //     body: JSON.stringify(data), // data can be `string` or {object}!
  //     headers: {
  //       Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //       "Content-Type": "application/json"

  //       // mode: "no-cors"
  //     }
  //   })
  //     .then(response => {
  //       if (response.status) return response;
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => response.json())
  //     .then(response => console.log("Success:", JSON.stringify(response)))
  //     .catch(error => console.error("Error:", error));
  // }

  // removeTicker = index => {
  //   this.setState(
  //     prevState => ({
  //       subscribedTickers: prevState.subscribedTickers.filter(
  //         ticker => ticker !== index
  //       )
  //     }),
  //     () => {
  //       this.loadData();
  //     }
  //   );

  //   if (this.auth.isAuthenticated()) {
  //     this.authorisedTickerCall("DELETE", index);
  //   }
  // };

  render() {
    if (this.state.hasError) {
      return <h1>Oops, there is an error!</h1>;
    }
    if (!this.state.tokenRenewalComplete) return <Loading />;

    // let content = !this.state.isLoaded ? (
    //   <Loading />
    // ) : ()
    let content = (
      <>
        <div>
          <Nav auth={this.auth} />

          <Switch>
            <Route exact path="/" component={HomePage} />

            {/* <Route
              path={["/pricing"]}
              render={props => (
                <PricingPage
                  data={this.state.data}
                  removeTicker={this.removeTicker}
                  auth={this.auth}
                  {...props}
                />
              )}
            /> */}

            <Route path="/about" component={AboutPage} />
            <Route
              path="/manage"
              render={() => (
                <ToastProvider>
                  <ManagePage
                    data={this.state.subscribedTickers}
                    addNewTicker={this.addNewTicker}
                    sectors={this.state.sectors}
                    filteredTickers={this.filteredTickers}
                    filteredTickersData={this.state.filteredTickers}
                  />
                </ToastProvider>
              )}
            />
            <Route
              path="/callback"
              render={props => <Callback auth={this.auth} {...props} />}
            />
            <Route
              path="/product/:pid"
              render={props => (
                <ProductForm
                  auth={this.auth}
                  appSettings={this.state.appSettings}
                  {...props}
                />
              )}
            />

            <Route
              path="/transactions/:pid"
              render={props => <TransactionsPage auth={this.auth} {...props} />}
            />

            <Route
              path="/wallet"
              render={props => (
                <WalletPage
                  auth={this.auth}
                  appSettings={this.state.appSettings}
                  {...props}
                />
              )}
            />

            <Route
              path="/watching"
              render={props => (
                <WatchListPage
                  auth={this.auth}
                  appSettings={this.state.appSettings}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </>
    );

    return content;
  }
}

export default App;
