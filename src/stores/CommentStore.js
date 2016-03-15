import alt from 'components/Dispatcher';
import CommentActions from 'actions/CommentActions';

export class CommentStore {
    constructor() {
        this.bindActions(CommentActions);
        this.comments = {};
        this.sentenceLinks = {};
        this.sentences = {};
        this.sentenceRanking = {};
    }

    onSetSentences(data) {
        const { sentences } = data;
        this.sentences = sentences;
    }

    onSetComments(data) {
        const { comments } = data;
        this.comments = comments;
    }

    onSetLinks(data) {
        const { links } = data;
        this.sentenceLinks = links;
    }

    onSetSentenceRanking(data) {
        const { ranking } = data;
        this.sentenceRanking = ranking;
    }
}

export default alt.createStore(CommentStore, 'CommentStore');
