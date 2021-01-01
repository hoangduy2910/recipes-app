import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import Input from "../../../shared/components/FormElement/Input/Input";
import ImageUpload from "../../../shared/components/FormElement/ImageUpload/ImageUpload";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./Profile.css";

const Profile = (props) => {
  const userId = useParams().userId;

  const {
    formState,
    inputChangeHandler,
    setFormData,
  } = useForm(
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
              isValid: false,
            },
          },
        },
        true
      );

      // profile = {
      //   image: {
      //     value: user.image,
      //     isValid: true,
      //   },
      //   username: {
      //     value: user.username,
      //     isValid: false,
      //   },
      //   firstName: {
      //     value: "",
      //     isValid: false,
      //   },
      //   lastName: {
      //     value: "",
      //     isValid: false,
      //   },
      // };
    };

    getUserById();
  }, [sendRequest, userId, setFormData]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {formState.inputs.profile.username && (
        <div className="profile">
          <div className="profile__image">
            <ImageUpload initialValue={formState.inputs.profile.image.value} isAvatar />
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
