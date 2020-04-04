import React, { useState } from 'react'
import Creds from 'Gruvee/config/creds'
import { connectRefinementList, InstantSearch } from 'react-instantsearch-native'
import algoliasearch from 'algoliasearch/lite'

// Children Components
import SearchBox from './components/SearchBox'
import InfiniteHitsList from './components/InfiniteHitsList'

// Properties
const VirtualRefinementList = connectRefinementList(() => null)
const searchClient = algoliasearch(Creds.Algolia.appId, Creds.Algolia.appKey)

// AlgoliaSearch
const AlgoliaSearch = ({ attribute }) => {
    const [searchState, onChangeSearchState] = useState({})
    const [selectedUsers, setSelectedUser] = useState([])

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={Creds.Algolia.indexName}
            searchState={searchState}
            onSearchStateChange={onChangeSearchState}
        >
            <VirtualRefinementList attribute={attribute} />
            <SearchBox
                placeholderText="Members"
                removeUser={removeUser(selectedUsers, setSelectedUser)}
                selectedUsers={selectedUsers}
            />
            <InfiniteHitsList selectUser={selectUser(selectedUsers, setSelectedUser)} />
        </InstantSearch>
    )
}

// Actions
const selectUser = (selectedUsers, setSelectedUser) => user => {
    setSelectedUser(users => [...users, user])
}

const removeUser = (selectedUsers, setSelectedUser) => objectID => {
    setSelectedUser(users => users.filter(user => user.objectID !== objectID))
}

export default AlgoliaSearch
