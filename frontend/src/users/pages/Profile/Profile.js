import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import Input from "../../../shared/components/FormElement/Input/Input";
import ImageUpload from "../../../shared/components/FormElement/ImageUpload/ImageUpload";
import Button from "../../../shared/components/UI/Button/Button";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./Profile.css";

const Profile = (props) => {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);

  const { formState, inputChangeHandler, setFormData } = useForm(
    {
      profile: {},
    },
    false
  );
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  useEffect(() => {
    const getUserById = async () => {
      const response = await sendRequest(`/users/${userId}`, "GET");

      const user = response.data.user;
      setFormData(
        {
          profile: {
            image: {
              value: user.image,
              isValid: true,
            },
            username: {
              value: user.username,
              isValid: true,
            },
            firstName: {
              value: user.firstName,
              isValid: true,
            },
            lastName: {
              value: user.lastName,
              isValid: true,
            },
          },
        },
        true
      );
    };

    getUserById();
  }, [sendRequest, userId, setFormData]);

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("image", formState.inputs.profile.image.value);
    formData.append("username", formState.inputs.profile.username.value);
    formData.append("firstName", formState.inputs.profile.firstName.value);
    formData.append("lastName", formState.inputs.profile.lastName.value);

    await sendRequest(`/users/${userId}`, "POST", formData, {
      Authorization: `Bearer ${auth.token}`,
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && formState.inputs.profile.username && (
        <div className="profile">
          <div className="profile__image">
            <ImageUpload
              id="image"
              isAvatar
              typeForm="profile"
              initialValue={formState.inputs.profile.image.value}
              onInput={inputChangeHandler}
            />
          </div>
          <div className="profile__info">
            <Input
              id="username"
              element="input"
              label="Display Name"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={formState.inputs.profile.username.value}
              errorText={`Please enter a valid username.`}
              typeForm="profile"
              onInput={inputChangeHandler}
            />
            <Input
              id="firstName"
              element="input"
              label="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={formState.inputs.profile.firstName.value}
              errorText={`Please enter a valid first name.`}
              typeForm="profile"
              onInput={inputChangeHandler}
            />
            <Input
              id="lastName"
              element="input"
              label="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={formState.inputs.profile.lastName.value}
              errorText={`Please enter a valid last name.`}
              typeForm="profile"
              onInput={inputChangeHandler}
            />
            <Button
              fill
              onClick={editProfileHandler}
              disabled={!formState.isValid}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
