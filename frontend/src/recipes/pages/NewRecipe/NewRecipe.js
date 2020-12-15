import React, { useState } from "react";

import FormInfo from "./FormInfo/FormInfo";
import FormIngredients from "./FormIngredients/FormIngredients";
import FormSteps from "./FormSteps/FormSteps";
import Button from "../../../shared/components/UI/Button/Button";
import "./NewRecipe.css";

const NewRecipe = (props) => {
  // const [formData, setFormData] = useState({
  //   title: {
  //     value: "",
  //     isValid: false,
  //   },
  //   description: {
  //     value: "",
  //     isValid: false,
  //   },
  // });
  
  const [formCount, setFormCount] = useState(1);
  
  const nextHandler = () => {
    setFormCount(formCount + 1);
  };

  const backHandler = () => {
    setFormCount(formCount - 1);
  };

  return (
    <React.Fragment>
      <form className="new-recipe-form">
        {formCount === 1 && <FormInfo />}
        {formCount === 2 && <FormIngredients />}
        {formCount === 3 && <FormSteps />}
        <Button
          type="button"
          fill
          onClick={backHandler}
          disabled={formCount < 2}
        >
          Back
        </Button>
        <Button
          type="button"
          fill
          onClick={nextHandler}
          disabled={formCount > 3}
        >
          Next
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
