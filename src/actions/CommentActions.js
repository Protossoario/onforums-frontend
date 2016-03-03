import alt from 'components/Dispatcher';

class CommentActions {
    setSentences(sentences) {
        return { sentences };
    }

    setComments(comments) {
        return { comments };
    }

    setLinks(links) {
        return { links };
    }

    setSentenceRanking(ranking) {
        return { ranking };
    }
}

export default alt.createActions(CommentActions);
