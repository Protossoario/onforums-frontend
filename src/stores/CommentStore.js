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

    getCommentForSentence(sId) {
        for (let cId in this.comments) {
            let comment = this.comments[cId];
            if (comment.sentences.indexOf(sId) !== -1) {
                return comment;
            }
        }
        return null;
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
