import alt from 'components/Dispatcher';
import CommentActions from 'actions/CommentActions';

export class CommentStore {
    constructor() {
        this.bindActions(CommentActions);
        this.comments = [];
        this.links = [];
    }

    onSetComments(data) {
        const { comments } = data;
        this.comments = comments;
    }

    onSetLinks(data) {
        const { links } = data;
        this.links = links;
    }
}

export default alt.createStore(CommentStore, 'CommentStore');
