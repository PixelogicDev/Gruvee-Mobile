// InukApp - "States are for suckers, we only want pure functions!" (01/27/20)
import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

// Middleware
import ReduxThunk from 'redux-thunk'
import Logger from '../Helpers/Logger'

import reducer from '../Reducers/index'

const middlewares = [Logger, ReduxThunk]
let store

const ReduxProvider = Component => {
    store = store || createStore(reducer, {}, applyMiddleware(...middlewares))

    return props => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}

export default ReduxProvider
