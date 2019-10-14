import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import ProfileForm from "./ProfileForm";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

function UserProfilePage({ loadProfile, saveProfile, history, ...props }) {
  const [profile, setProfile] = useState({ ...props.profile });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile || !profile === {}) {
      loadProfile().catch(error => {
        console.log("Loading profile failed" + error);
      });
    } else {
      setProfile({ ...props.profile });
    }
    // eslint-disable-next-line
  }, [props.profile]);

  function handleChange(event) {
    console.log("handleChange before", profile);
    // debugger;
    const { value, name } = event.target;
    // const { name } = event.target;

    console.log(name, value);
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
      // [name]: name === "devmode" ? (value === "on" ? true : false) : value
    }));
    // console.log("handleChange after", profile);
  }

  function formIsValid() {
    const { currency } = profile;
    const errors = {};

    if (!currency) errors.currency = "Currency is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProfile(profile)
      .then(console.log("handleSave ", profile))
      .then(() => {
        toast.info("Profile updated");
        history.push("/");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleCancel(event) {
    event.preventDefault();
    history.goBack();
  }

  return profile.length === 0 ? (
    <Loading />
  ) : (
    <ProfileForm
      profile={profile}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      cancel={handleCancel}
    />
  );
}

UserProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile
  };
}

const mapDispatchToProps = {
  loadProfile: profileActions.loadProfile,
  saveProfile: profileActions.saveProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
