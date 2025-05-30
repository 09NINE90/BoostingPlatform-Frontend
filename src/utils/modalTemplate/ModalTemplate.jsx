import PropTypes from 'prop-types';
import styles from '../../styles/ModalTemplate.module.css';
import classNames from 'classnames';

const ModalTemplate = ({
                           isOpen,
                           title,
                           content,
                           actions,
                           onClose,
                           modalClassName,
                           modalContentClassName,
                           additionalStyles,
                           width
                       }) => {
    if (!isOpen) return null;

    const modalStyle = {
        width: width || '400px',
    };

    return (
        <div className={`${styles.overlay}`}>
            <div className={`${classNames(styles.modal, modalClassName)} ${additionalStyles}`}
                 style={modalStyle}
            >
                <div className={classNames(styles.modalContent, modalContentClassName)}>
                    <button className={styles.modalClose} onClick={onClose}>
                        &times;
                    </button>
                    {title && <h2 className={styles.modalTitle}>{title}</h2>}
                    <div className={styles.modalBody}>{content}</div>
                    <div className={`${styles.modalActions}` }>{actions}</div>
                </div>
            </div>
        </div>
    );
};

ModalTemplate.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.node,
    actions: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    modalClassName: PropTypes.string,
    modalContentClassName: PropTypes.string,
};

export default ModalTemplate;