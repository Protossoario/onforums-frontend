import alt from 'components/Dispatcher';
import ArticleActions from 'actions/ArticleActions'

export class ArticleStore {
    constructor() {
        this.bindActions(ArticleActions);

        this.articleURL = '';
        this.loadingSummary = false;
        this.summaryErrorMsg = '';
        this.authorName = '';
    }

    onSetArticleURL(data) {
        const { articleURL } = data;
        this.articleURL = articleURL;
        this.summaryErrorMsg = '';
    }

    onLoadingSummary() {
        this.loadingSummary = true;
    }

    onLoadSummarySuccess() {
        this.summaryErrorMsg = '';
        this.loadingSummary = false;
    }

    onLoadSummaryFailed() {
        this.summaryErrorMsg = 'Failed to load summary.';
        this.loadingSummary = false;
    }

    onSetSummaryErrorMsg(data) {
        const { errorMsg } = data;
        this.summaryErrorMsg = errorMsg;
    }

    onSetAuthorName(data) {
        const { authorName } = data;
        this.authorName = authorName;
    }
}

export default alt.createStore(ArticleStore, 'ArticleStore');
