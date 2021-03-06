import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {actions} from 'Host/Redux/';
import {immutableOperations} from 'Shared/Utilities/';
import FlashMessage from './FlashMessage/';
import style from './style.css';

const {$get} = immutableOperations;

@connect(state => ({
    flashMessages: $get(state, 'ui.flashMessages')
}), {
    removeMessage: actions.UI.FlashMessages.remove
})
export default class FlashMessageContainer extends Component {
    static propTypes = {
        flashMessages: PropTypes.instanceOf(Immutable.Map),
        removeMessage: PropTypes.func.isRequired
    };

    render() {
        const {flashMessages, removeMessage} = this.props;

        return (
            <div className={style.flashMessageContainer}>
                {flashMessages.map(flashMessage => {
                    const {id, message, severity, timeout} = flashMessage.toJS();

                    return (
                        <FlashMessage
                            key={id}
                            message={message}
                            severity={severity}
                            timeout={timeout}
                            onClose={() => removeMessage(id)}
                            />
                    );
                }).toArray()}
            </div>
        );
    }
}
