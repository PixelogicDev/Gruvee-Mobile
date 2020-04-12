import React, { memo, useState } from 'react'
import Creds from 'Gruvee/config/creds'
import { InstantSearch } from 'react-instantsearch-native'
import algoliasearch from 'algoliasearch/lite'

// Children Components
import SearchBox from './components/SearchBox'
import InfiniteHitsList from './components/InfiniteHitsList'

// Properties
const searchClient = algoliasearch(Creds.Algolia.appId, Creds.Algolia.appKey)

// AlgoliaSearch
const AlgoliaSearch = ({ selectedUsers, setSelectedUser }) => {
    const [searchState, onChangeSearchState] = useState({})
    const [clearInput, setClearInput] = useState(false)

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={Creds.Algolia.indexName}
            searchState={searchState}
            onSearchStateChange={onChangeSearchState}
        >
            <SearchBox
                clearInput={clearInput}
                placeholderText="Members"
                removeUser={removeUser(selectedUsers, setSelectedUser)}
                selectedUsers={selectedUsers}
                setClearInput={setClearInput}
            />
            <InfiniteHitsList
                selectedUsers={selectedUsers}
                selectUser={selectUser(selectedUsers, setSelectedUser, setClearInput)}
            />
        </InstantSearch>
    )
}

// Actions
const selectUser = (selectedUsers, setSelectedUser, setClearInput) => user => {
    setSelectedUser(users => [...users, user])
    setClearInput(true)
}

const removeUser = (selectedUsers, setSelectedUser) => objectID => {
    setSelectedUser(users => users.filter(user => user.objectID !== objectID))
}

export default memo(AlgoliaSearch)
