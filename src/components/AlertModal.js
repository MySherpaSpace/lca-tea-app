import ReactDOM from "react-dom";
import { useEffect } from "react";
import classNames from "classnames";

function AlertModal({ onClose, content, isOpen, title, buttons}) {
  const alertButtons = buttons? buttons : [{title: "Ok", style: "default"}] 
  useEffect(()=>{
    document.body.classList.add("is-clipped");

    //before component is removed, do this
    return () => {
      document.body.classList.remove("is-clipped");
    }
  },[]);

  const renderedActionButtons = alertButtons.map((acBtn, index) => {
    const buttonClass = classNames("button ml-4", acBtn.style === "default"? "is-primary": acBtn.style === "destructive"? 'is-danger is-outlined': "")
    const onButtonClick = () => {
      if(acBtn.onClick) acBtn.onClick()
      onClose()
    }
    return <button key={index} className={buttonClass} onClick={onButtonClick}>{acBtn.title}</button>
  }) 

  return ReactDOM.createPortal((
    <div className={isOpen? "modal is-active" :"modal"}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-box">
          {title && (
            <header className="modal-card-head has-background-white">
              <p className="modal-card-title">{title}</p>
              <button className="delete" aria-label="close" onClick={onClose}></button>
            </header>
          )}
          {content &&(
            <section className="modal-card-body">
              <p>{content}</p>
            </section>
          )}            
          <footer className="modal-card-foot is-justify-content-end">
            {renderedActionButtons}
          </footer>
        </div>
      </div>
    </div>
  ),
    document.querySelector(".modal-container")
  );
}
 
export default AlertModal;


/*
Modal setup vars
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false);
  }


  const actionBar = (
    <div>
      <button className="button is-primary" onClick={handleModalClose}>I Accept</button>
    </div>
  );

  const modal = (
    <Modal onClose={handleModalClose} actionBar={actionBar} isOpen={showModal}>
      <p>Here is an important agreement for you to accept</p>
    </Modal>
  );

*/