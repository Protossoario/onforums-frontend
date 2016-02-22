import alt from 'components/Dispatcher';

class CommentActions {
    setComments(comments) {
        return { comments };
    }

    setLinks(links) {
        return { links };
    }
}

export default alt.createActions(CommentActions);
