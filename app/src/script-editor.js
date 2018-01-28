import { connect } from 'react-redux';
import EditView from './edit-view';

import {
    scriptList,
    scriptRead,
    scriptChange,
    scriptSelect,

    toolInvoke,
} from './model/script-actions';

import {
    sidebarToggle,
    sidebarSize,
} from './model/sidebar-actions';


const getScriptListing = ({buffers, activeBuffer, listing}) => {
    // enrich script listing w/ modification state, etc.
    return listing.toJS().map(l => {
        let item = Object.assign({}, l);
        item.active = l.url === activeBuffer;

        let buffer = buffers.get(l.url);
        if (buffer) {
            item.loaded = true;
            item.modified = buffer.get('modified') || false;
        }

        return item;
    });
}

const mapStateToProps = (state) => {
    let {activeBuffer, buffers} = state.scripts;
    return {
        editor: {activeBuffer, buffers},
        sidebar: {
            ...state.sidebar,
            data: getScriptListing(state.scripts),
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // scripts
        scriptList: (api) => {
            dispatch(scriptList(api))
        },
        scriptRead: (api, resource) => {
            dispatch(scriptRead(api, resource))
        },
        scriptChange: (resource, value) => {
            dispatch(scriptChange(resource, value))
        },
        scriptSelect: (resource) => {
            dispatch(scriptSelect(resource))
        },

        // sidebar
        sidebarToggle: () => {
            dispatch(sidebarToggle())
        },
        sidebarSize: (width) => {
            dispatch(sidebarSize(width))
        },

        // tools
        toolInvoke: (name) => {
            dispatch(toolInvoke(name))
        },
    }
}

const ScriptEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditView);

export default ScriptEditor;