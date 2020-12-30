import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  let formIsValid;

  switch (action.type) {
    case "INPUT_CHANGE":
      formIsValid = true;
      for (const inputId in state.inputs[action.typeForm]) {
        // if (!state.inputs[inputId]) {
        //   continue;
        // }

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid && state.inputs[action.typeForm][inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.typeForm]: {
            ...state.inputs[action.typeForm],
            [action.inputId]: {
              value: action.value,
              isValid: action.isValid,
            },
          },
        },
        isValid: formIsValid,
      };
    case "INPUT_ADD":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.typeForm]: {
            ...state.inputs[action.typeForm],
            [action.inputId]: {
              value: "",
              isValid: false,
            },
          },
        },
      };
    case "INPUT_REMOVE":
      const inputsElement = { ...state.inputs[action.typeForm] };
      delete inputsElement[action.inputId];

      formIsValid = true;
      for (const inputId in inputsElement) {
        formIsValid = formIsValid && inputsElement[inputId].isValid;
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.typeForm]: inputsElement,
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInput, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: initialFormValidity,
  });

  const inputChangeHandler = useCallback((id, value, isValid, typeForm) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
      typeForm: typeForm,
    });
  }, []);

  const inputAddHandler = useCallback((id, typeForm) => {
    dispatch({
      type: "INPUT_ADD",
      inputId: id,
      typeForm: typeForm,
    });
  }, []);

  const inputRemoveHandler = useCallback((id, isValid, typeForm) => {
    dispatch({
      type: "INPUT_REMOVE",
      inputId: id,
      isValid: isValid,
      typeForm: typeForm,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [
    formState,
    inputChangeHandler,
    inputAddHandler,
    inputRemoveHandler,
    setFormData,
  ];
};
