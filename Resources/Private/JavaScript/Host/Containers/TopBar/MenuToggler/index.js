import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import {$transform, $get} from 'plow-js';

import {actions} from 'Host/Redux/';
import {Button} from 'Host/Components/';

import style from './style.css';

@connect($transform({
    isMenuHidden: $get('ui.offCanvas.isHidden')
}))
export default class MenuToggler extends Component {
    static propTypes = {
        className: PropTypes.string,
        isMenuHidden: PropTypes.bool.isRequired,
        dispatch: PropTypes.any.isRequired
    };

    render() {
        const {className, isMenuHidden} = this.props;
        const isMenuVisible = !isMenuHidden;
        const classNames = mergeClassNames({
            [style['menuToggler--isActive']]: isMenuVisible,
            [className]: className && className.length
        });

        return (
            <Button
                className={classNames}
                style="clean"
                hoverStyle="clean"
                isFocused={isMenuVisible}
                onClick={this.onMenuToggle.bind(this)}
                id="neos__topBar__menuToggler"
                >
                <div className={style.menuToggler__icon}></div>
            </Button>
        );
    }

    onMenuToggle() {
        this.props.dispatch(actions.UI.OffCanvas.toggle());
    }
}
