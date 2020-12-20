import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && (
        <div className={`modal ${props.className}`}>
          <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
          </header>
          <form
            onSubmit={
              props.onSubmit
                ? props.onSubmit
                : (event) => event.preventDefault()
            }
          >
            <div className={`modal__content ${props.contentClass}`}>
              {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
