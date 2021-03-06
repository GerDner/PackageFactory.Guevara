import React, {PropTypes} from 'react';
import mergeClassNames from 'classnames';
import {executeCallback} from 'Shared/Utilities/';
import IconButton from 'Host/Components/IconButton/';
import Portal from 'Host/Components/Portal/';
import style from './style.css';

const Dialog = props => {
    const {
        className,
        children,
        isOpen,
        onRequestClose,
        actions,
        ...directProps
    } = props;
    const classNames = mergeClassNames({
        [style.dialog]: true,
        [className]: className && className.length
    });

    return (
        <Portal targetId="dialog" isOpened={isOpen}>
            <section className={classNames} {...directProps} role="dialog" tabIndex="0">
                <div className={style.dialog__contentsPosition}>
                    <div className={style.dialog__contents}>
                        <IconButton
                            icon="close"
                            className={style.dialog__closeBtn}
                            id="neos__modal__closeModal"
                            onClick={e => executeCallback({e, cb: onRequestClose})}
                            />

                        {children}

                        <div className={style.dialog__actions}>
                            {actions.map((action, index) => <span key={index}>{action}</span>)}
                        </div>
                    </div>
                </div>
            </section>
        </Portal>
    );
};
Dialog.propTypes = {
    // State propTypes.
    isOpen: PropTypes.bool.isRequired,

    // Will be called once the close icon in the top right corner gets clicked.
    onRequestClose: PropTypes.func.isRequired,

    // Contents of the Dialog.
    children: PropTypes.node.isRequired,

    // Optional Array of nodes(Action buttons f.e.) which are placed at the bottom of the Dialog.
    actions: PropTypes.node.isRequired,

    // Style related propTypes.
    className: PropTypes.string
};

export default Dialog;
