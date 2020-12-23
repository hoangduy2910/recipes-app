import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import ImageUpload from "../../../../shared/components/FormElement/ImageUpload/ImageUpload";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";

const FormInfo = React.memo((props) => {
  let element, label, type;

  const info = Object.keys(props.data).map((itemId, idx) => {
    if (itemId === "title") {
      element = "input";
      label = "Title";
      type = "text";
    } else if (itemId === "description") {
      element = "textarea";
      label = "Description";
      type = "text";
    } else if (itemId === "preparationTime") {
      element = "input";
      label = "Preparation Time (minute)";
      type = "number";
    } else if (itemId === "cookingTime") {
      element = "input";
      label = "Cooking Time (minute)";
      type = "number";
    } else {
      element = "input";
      label = "Servings";
      type = "number";
    }

    let input;
    if (itemId === "image") {
      input = (
        <ImageUpload
          key={idx}
          id={itemId}
          initialValue={props.data[itemId].value}
          typeForm="info"
          onInput={props.inputChange}
        />
      );
    } else {
      input = (
        <Input
          key={idx}
          id={itemId}
          element={element}
          label={label}
          type={type}
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={props.data[itemId].value}
          errorText={`Please enter a valid ${itemId}.`}
          typeForm="info"
          onInput={props.inputChange}
        />
      );
    }

    return input;
  });

  const formInfo = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Information</span>
      </div>
      {info}
    </React.Fragment>
  );

  return formInfo;
});

export default FormInfo;
