import 'Shared/Styles/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import assign from 'lodash.assign';
import registry from '@reduct/registry';

import {configureStore} from './Redux/';

import initializeJSAPI from 'API/';
import {ui} from './Plugins/';
import initializeExposers from './Plugins/UI/Exposer/';

import * as feedbackHandler from './Service/FeedbackHandler/';

import {
    ContentView,
    FooterBar,
    TopBar,
    LeftSideBar,
    OffCanvas,
    RightSideBar,
    ContextBar,
    FlashMessageContainer,
    FullScreen
} from './Containers/';
import {
    backend,
    nodeTreeService,
    tabManager,
    changeManager,
    feedbackManager,
    publishingService,
    i18n
} from './Service/';

import style from './style.css';

// Initialize the backend application on load.
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('appContainer');
    const firstTabUri = appContainer.dataset.firstTab;
    const csrfToken = appContainer.dataset.csrfToken;
    const serverState = JSON.parse(appContainer.querySelector('[data-json="initialState"]').innerHTML);
    const translations = JSON.parse(appContainer.querySelector('[data-json="translations"]').innerHTML);
    const neos = initializeJSAPI(window);
    const store = configureStore({serverState}, neos);

    // Bootstrap the i18n service before the initial render.
    assign(backend, {
        i18n: i18n(translations)
    });

    // Initialize Neos JS API plugins
    neos.use(ui(store));

    // Initialize subscriber
    initializeExposers();

    ReactDOM.render(
        <div className={style.applicationWrapper}>
            <Provider store={store}>
                <div>
                    <div id="dialog" />
                    <FlashMessageContainer />
                    <FullScreen />
                    <TopBar />
                    <ContextBar />
                    <OffCanvas />
                    <LeftSideBar />
                    <ContentView />
                    <RightSideBar />
                    <FooterBar />
              </div>
            </Provider>
        </div>,
        appContainer
    );

    // Bootstrap the backend services
    assign(backend, {
        tabManager: tabManager(store),
        changeManager: changeManager(store, csrfToken),
        feedbackManager: feedbackManager(store),
        publishingService: publishingService(store, csrfToken),
        nodeTreeService: nodeTreeService(store, csrfToken),

        asyncComponents: {
            feedbackHandlers: registry()
        }
    });

    backend.tabManager.createTab(firstTabUri);

    // Register FeedbackHandlers
    backend.asyncComponents.feedbackHandlers.registerAll({
        'PackageFactory.Guevara:Success': feedbackHandler.flashMessage,
        'PackageFactory.Guevara:Error': feedbackHandler.flashMessage,
        'PackageFactory.Guevara:Info': feedbackHandler.logToConsole,
        'PackageFactory.Guevara:UpdateWorkspaceInfo': feedbackHandler.updateWorkspaceInfo,
        'PackageFactory.Guevara:ReloadDocument': feedbackHandler.reloadDocument
    });
});
