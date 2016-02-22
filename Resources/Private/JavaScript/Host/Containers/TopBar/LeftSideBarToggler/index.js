import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import {$transform, $get} from 'plow-js';

import {actions} from 'Host/Redux/';
import {Button, I18n} from 'Host/Components/';

import style from './style.css';

@connect($transform({
    isSideBarHidden: $get('ui.leftSideBar.isHidden')
}))
export default class LeftSideBarToggler extends Component {
    static propTypes = {
        className: PropTypes.string,
        isSideBarHidden: PropTypes.bool.isRequired,
        dispatch: PropTypes.any.isRequired
    };

    render() {
        const {className, isSideBarHidden} = this.props;
        const isActive = !isSideBarHidden;
        const classNames = mergeClassNames({
            [className]: true,
            [style['btn--isActive']]: isActive
        });

        return (
            <Button
                className={classNames}
                style="clean"
                hoverStyle="clean"
                isFocused={isActive}
                onClick={this.onLeftSidebarToggle.bind(this)}
                id="neos__topBar__leftSideBarToggler"
                >
                <I18n id="Navigate" fallback="Navigate" />
            </Button>
        );
    }

    onLeftSidebarToggle() {
        this.props.dispatch(actions.UI.LeftSideBar.toggle());
    }
}
