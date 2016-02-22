import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';

import {actions} from 'Host/Redux/';
import {IconButton} from 'Host/Components/';

import style from './style.css';

@connect($transform({
    isFullScreen: $get('ui.fullScreen.isFullScreen')
}))
export default class FullScreen extends Component {
    static propTypes = {
        isFullScreen: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        return this.props.isFullScreen ? <div className={style.fullScreenClose}><IconButton icon="expand" onClick={this.onClickToggleFullScreen.bind(this)} /></div> : null;
    }

    onClickToggleFullScreen() {
        this.props.dispatch(actions.UI.FullScreen.toggle());
    }
}
