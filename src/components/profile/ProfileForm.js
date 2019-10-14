import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import Checkbox from "../common/CheckBox";
import styles from "./ProfileForm.css";
import { Container } from "react-bootstrap";
import { PORTFOLIOCURRENCIES } from "./ProfileStatics";

const UserProfileForm = ({
  profile,
  onSave,
  onChange,
  saving = false,
  cancel,
  errors = {}
}) => {
  return (
    <>
      <br></br>
      <div className={styles}>
        <Container className="App">
          <form onSubmit={onSave} className="form">
            <h2>{profile.id ? "Edit" : "Add"} profile</h2>
            {errors.onSave && (
              <div className="alert alert-danger" role="alert">
                {errors.onSave}
              </div>
            )}
            <SelectInput
              name="currency"
              label="Portfolio currency:"
              value={profile.currency || ""}
              defaultOption="Select portfolio currency"
              options={PORTFOLIOCURRENCIES}
              onChange={onChange}
              error={errors.currency}
            />
            {/* <SelectInput
              name="devmode"
              label="Developer Mode:"
              value={profile.devmode || ""}
              defaultOption={false}
              options={DEVMODEOPTIONS}
              onChange={onChange}
              error={errors.devmode}
            /> */}
            <Checkbox
              name="devmode"
              label="Developer Mode:"
              value={profile.devmode}
              onChange={onChange}
              error={errors.devmode}
            />
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
              value="save"
            >
              {saving ? "Saving..." : "Save"}
            </button>{" "}
            <button
              type="button"
              disabled={saving}
              className="btn btn-outline-danger right"
              onClick={cancel}
              value="cancel"
            >
              Cancel
            </button>
          </form>
        </Container>
      </div>
    </>
  );
};

UserProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default UserProfileForm;
