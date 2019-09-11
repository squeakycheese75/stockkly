import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import UserProfileForm from "./UserProfileForm";
import Loading from "../common/Loading";
// import { toast } from "react-toastify";

function UserProfilePage({ profile, loadProfile, saveProfile, ...props }) {
  //   const [profile, setProfile] = useState({ ...props.profile });
  //   const [errors, setErrors] = useState({});
  //   const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile.length === 0) {
      loadProfile().catch(error => {
        console.log("Loading profile failed" + error);
      });
    }
  }, [props.profile]);

  return profile.length === 0 ? (
    <Loading />
  ) : (
    <UserProfileForm
      profile={profile}
      // errors={errors}
      // onChange={handleChange}
      // onSave={handleSave}
      // saving={saving}
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
