export const generateCardEvents = ({ revisions }: { revisions: any }) => {
    const card_events = [];
    let id = 1;
    for (const revision of revisions) {
        card_events.push({
            id: id++,
            card_id: revision.recordId,
            user_id: revision.authorId,
            date: revision.date,
            message: "",
            revision_id: revision.id,
            type: 'revision'
        });
    }
    return card_events;
};