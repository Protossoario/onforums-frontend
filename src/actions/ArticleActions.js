import alt from 'components/Dispatcher';
import axios from 'axios';
import CommentActions from 'actions/CommentActions';

class ArticleActions {
    constructor() {
        this.generateActions(
            'loadingSummary',
            'loadSummarySuccess',
            'loadSummaryFailed'
        );
    }

    summarize(articleURL) {
        this.loadingSummary();
        axios.post('/summarize', {
            url: articleURL
        })
        .then((response) => {
            if (response.data && response.data.status) {
                if (response.data.status === 'done') {
                    let summary = response.data.result;
                    CommentActions.setComments(summary.comments);
                    CommentActions.setLinks(summary.links);
                    CommentActions.setSentences(summary.sentences);
                    CommentActions.setSentenceRanking(summary.ranking);
                    this.setAuthorName(summary.author)
                    this.loadSummarySuccess();
                }
                else if (response.data.status === 'processing') {
                    // try again later
                    window.setTimeout(this.summarize.bind(this, articleURL), 2000);
                }
                else {
                    this.loadSummaryFailed(response);
                }
            }
            else {
                this.loadSummaryFailed(response);
            }
        })
        .catch((response) => {
            this.loadSummaryFailed(response);
        });
    }

    setArticleURL(articleURL) {
        return { articleURL };
    }

    setSummaryErrorMsg(errorMsg) {
        return { errorMsg };
    }

    setAuthorName(authorName) {
        return { authorName };
    }
}

export default alt.createActions(ArticleActions);
