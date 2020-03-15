// InukApp - "States are for suckers, we only want pure functions!" (01/27/20)
import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'

// Middleware
import ReduxThunk from 'redux-thunk'
import Logger from 'Gruvee/redux/helpers/logger'

import reducer from 'Gruvee/redux/reducers'

const middlewares = [Logger, ReduxThunk]
// eslint-disable-next-line no-underscore-dangle
// eslint-disable-next-line no-undef
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store

const ReduxProvider = Component => {
    store = store || createStore(reducer, composeEnhancer(applyMiddleware(...middlewares)))

    return props => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}

export default ReduxProvider
