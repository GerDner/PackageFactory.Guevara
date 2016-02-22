import React, {Component, PropTypes} from 'react';
import mergeClassNames from 'classnames';
import {connect} from 'react-redux';
import {$transform, $get, $or} from 'plow-js';

import {SideBar} from 'Host/Components/';
import NodeTreeToolBar from './NodeTreeToolBar/';
import PageTree from './PageTree/';
import style from './style.css';

@connect($transform({
    isHidden: $or(
        $get('ui.leftSideBar.isHidden'),
        $get('ui.fullScreen.isFullScreen')
    )
}))
export default class LeftSideBar extends Component {
    static propTypes = {
        isHidden: PropTypes.bool.isRequired
    };

    render() {
        const classNames = mergeClassNames({
            [style.leftSideBar]: true,
            [style['leftSideBar--isHidden']]: this.props.isHidden
        });

        return (
            <SideBar position="left" className={classNames} id="neos__leftSidebar">
                <NodeTreeToolBar />
                <PageTree />
            </SideBar>
        );
    }
}
