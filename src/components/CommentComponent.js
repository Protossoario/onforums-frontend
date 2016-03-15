'use strict';

import React, { Component, PropTypes } from 'react';

require('styles//Comment.sass');

class CommentComponent extends Component {
    render() {
        const { isArticleSentence, author, replyTo, highlightSentence, previousSentence, nextSentence, clickHandler, focused } = this.props;
        return (
            <div className={ 'comment-component' + (focused ? ' focused' : '' ) } onClick={ clickHandler }>
                <div className="author-header">
                    <span className="author-name">@{ author }</span>
                    { isArticleSentence && <span className="author-article"> (Article Author)</span> }
                    { replyTo && <span className="reply-to"> → <span className="reply-name">{ replyTo }</span></span> }
                </div>
                <div className="content">
                    <span className="previous">{ previousSentence } </span>
                    <span className="highlight">{ highlightSentence }</span>
                    <span className="next"> { nextSentence }</span>
                </div>
            </div>
        );
    }
}

CommentComponent.displayName = 'CommentComponent';

// Uncomment properties you need
CommentComponent.propTypes = {
    isArticleSentence: PropTypes.bool,
    author: PropTypes.string.isRequired,
    replyTo: PropTypes.string,
    highlightSentence: PropTypes.string.isRequired,
    previousSentence: PropTypes.string,
    nextSentence: PropTypes.string,
    clickHandler: PropTypes.func,
    focused: PropTypes.bool
};
// CommentComponent.defaultProps = {};

export default CommentComponent;
