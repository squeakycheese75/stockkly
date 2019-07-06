import React, { Component } from "react";
import WalletSettings from "./components/WalletSettings";

class ProfilePage extends Component {
  // _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      appSettings: this.props.appSettings,
      profileCcy: this.props.appSettings.currency
    };
    this.auth = this.props.auth;
    this.updateProfile = this.updateProfile.bind(this);
  }
  componentDidMount() {
    // this.loadUserProfile();
  }

  updateProfile(appSettings) {
    // this.props.auth.getProfile((profile, error) =>
    //   this.setState({ profile, error })
    // );
    console.log(appSettings);
    // this.setState(prevState => ({
    //   appSettings: (prevState.appSettings.currency = input)
    // }));
    // this.setState({
    //   profileCcy: input
    // });
    // console.log("appsettings", this.state.appSettings);
    // console.log("Setting ccy: ", this.state.profileCcy);
    this.props.updateProfile(appSettings);
  }

  render() {
    // const { profile } = this.state;

    // if (!this.auth.isAuthenticated()) return null;
    return (
      <>
        {/* <h1>Profile</h1>> */}
        <WalletSettings
          appSettings={this.state.appSettings}
          updateProfile={this.updateProfile}
        />
      </>
    );
  }
}

export default ProfilePage;
