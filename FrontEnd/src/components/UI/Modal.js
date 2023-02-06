const Modal = (props) => {
  const modalClicked = (event) => {
    if (event.target.classList == "Modal") {
      props.onClick();
    } else {
      return;
    }
  };

  return (
    <div className="Modal" onClick={modalClicked}>
      {props.children}
    </div>
  );
};

export default Modal;
