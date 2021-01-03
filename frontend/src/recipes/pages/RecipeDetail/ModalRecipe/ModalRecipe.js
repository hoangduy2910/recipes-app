import React from "react";

import Modal from "../../../../shared/components/UI/Modal/Modal";
import Button from "../../../../shared/components/UI/Button/Button";

const ModalRecipe = (props) => {
  const modalRecipe = (
    <Modal
      show={props.isShow}
      onCancel={props.onCancel}
      header={props.header}
      footer={
        <React.Fragment>
          <Button
            type="button"
            fill
            onClick={props.onCancel}
            className={props.btnClass}
          >
            Cancel
          </Button>
          <Button
            type="button"
            fill
            onClick={props.onSubmit}
            className={props.btnClass}
          >
            {props.submitText}
          </Button>
        </React.Fragment>
      }
    >
      {props.children}
    </Modal>
  );

  return modalRecipe;
};

export default ModalRecipe;
