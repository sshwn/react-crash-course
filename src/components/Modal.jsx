import classes from './Modal.module.css';

function Modal(props) {
    return (
        <>
            <div className={classes.backdrop} >
                <dialog open={true} className={classes.modal}>
                    {props.children}
                </dialog>
            </div>
        </>
    )
}

export default Modal;