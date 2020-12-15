import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
      };
    case "INPUT_ADD":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: "",
            isValid: false,
          },
        },
      };
    case "INPUT_REMOVE":
      const inputs = { ...state.inputs };
      let removedInput = Object.keys(inputs).splice(action.inputId, 1)[0];
      let updatedInputs = {};
      for (let input in inputs) {
        if (input !== removedInput) {
          updatedInputs[input] = inputs[input];
        }
      }
      console.log(updatedInputs);
      return {
        ...state,
        inputs: updatedInputs,
      };
    default:
      return state;
  }
};

export const useForm = (initialInput) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
  });

  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const inputAddHandler = useCallback((id) => {
    dispatch({
      type: "INPUT_ADD",
      inputId: id,
    });
  }, []);

  const inputRemoveHandler = useCallback((id) => {
    dispatch({
      type: "INPUT_REMOVE",
      inputId: id,
    });
  }, []);

  return [formState, inputChangeHandler, inputAddHandler, inputRemoveHandler];
};
