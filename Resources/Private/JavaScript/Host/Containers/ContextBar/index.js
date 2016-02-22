import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import {$transform, $get} from 'plow-js';

import {actions} from 'Host/Redux/';
import {IconButton} from 'Host/Components/';
import DimensionSwitcher from './DimensionSwitcher/';

import style from './style.css';

@connect($transform({
    isFringedLeft: $get('ui.leftSideBar.isHidden'),
    isFringedRight: $get('ui.rightSideBar.isHidden'),
    isFullScreen: $get('ui.fullScreen.isFullScreen')
}))
export default class ContextBar extends Component {
    static propTypes = {
        isFringedLeft: PropTypes.bool.isRequired,
        isFringedRight: PropTypes.bool.isRequired,
        isFullScreen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const {isFringedLeft, isFringedRight, isFullScreen} = this.props;
        const classNames = mergeClassNames({
            [style.contextBar]: true,
            [style['contextBar--isFringeLeft']]: isFringedLeft,
            [style['contextBar--isFringeRight']]: isFringedRight,
            [style['contextBar--isHidden']]: isFullScreen
        });

        return (
            <div className={classNames}>
                <DimensionSwitcher />

                <div className={style.contextBar__rightHandedActions}>
                    <IconButton icon="external-link" onClick={this.onClickOpenInNewTab.bind(this)} />
                    <IconButton icon="expand" onClick={this.onClickToggleFullScreen.bind(this)} />
                </div>
            </div>
        );
    }

    onClickOpenInNewTab() {
        console.log('open the current opened session into a new browser tab.');
    }

    onClickToggleFullScreen() {
        this.props.dispatch(actions.UI.FullScreen.toggle());
    }
}
