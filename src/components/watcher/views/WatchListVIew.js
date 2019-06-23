// import Loading from "./components/common/Loading";

// class WatchListVIew extends React.Component {
//   renderLoading() {
//     return <Loading />;
//   }

//   renderError() {
//     return <div>I'm sorry! Please try again.</div>;
//   }

//   renderPlanet() {
//     // const { name, climate, terrain } = this.props.planet;
//     return (
//       <div>
//         {isEmpty(this.state.watchData) ? (
//           <>
//             <Alert key="empty" variant="secondary" as="h5">
//               <Alert.Heading>Watchlist is empty!</Alert.Heading>
//               <p>Go and find stuff to watch</p>
//             </Alert>
//           </>
//         ) : (
//           <WatchListTable
//             data={this.state.watchData}
//             onSubmit={this.removeTicker}
//             settings={this.state.appSettings}
//           />
//         )}
//       </div>
//     );
//   }

//   render() {
//     if (this.props.loading) {
//       return this.renderLoading();
//     } else if (this.props.planet) {
//       return this.renderPlanet();
//     } else {
//       return this.renderError();
//     }
//   }
// }
