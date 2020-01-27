export default store => next => action => {
    console.info(
        '%cRECEIVED ACTION',
        'color: #7BD389; background: #484D6D',
        action
    )
    const nextResult = next(action)
    console.info(
        '%cNEXT',
        'color: #7BD389; background: #484D6D',
        store.getState()
    )

    return nextResult
}
