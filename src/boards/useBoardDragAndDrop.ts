export const useBoardDragAndDrop = () => {
    // As Pangea DND requires synchronous updates, we need to store the board tree structure in a local state in
    // addition to the react-query cache. This state will be updated synchronously when the user drags and drops a card or
    // a column. The react-query cache will be updated asynchronously after the local state has been updated (even for optimistic updates).
}