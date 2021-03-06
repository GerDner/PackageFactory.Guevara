import {combineReducers} from 'redux';
import {
    reducer as SettingsReducer,
    actions as Settings
} from './Settings/';
import {
    reducer as NameReducer
} from './Name/';

//
// Export the actions
//
export const actions = {
    Settings
};

//
// Export the reducer
//
export const reducer = {
    user: combineReducers({
        settings: SettingsReducer,
        name: NameReducer
    })
};
