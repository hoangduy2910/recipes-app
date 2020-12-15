import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";

const FormInfo = React.memo((props) => {
  const info = Object.keys(props.data).map((itemId, idx) => {
    let element = "";
    let label = "";

    if (itemId === "title") {
      element = "input";
      label = "Title";
    } else {
      element = "textarea";
      label = "Description";
    }

    return (
      <Input
        key={idx}
        id={itemId}
        element={element}
        label={label}
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={props.data[itemId].value}
        errorText={`Please enter a valid ${itemId}.`}
        typeForm="info"
        onInput={props.inputChange}
      />
    );
  });

  const formInfo = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Info</span>
      </div>
      {info}
    </React.Fragment>
  );

  return formInfo;
});

export default FormInfo;
