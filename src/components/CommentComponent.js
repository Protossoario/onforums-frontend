'use strict';

import React, { Component, PropTypes } from 'react';

require('styles//Comment.sass');

class CommentComponent extends Component {
    render() {
        return (
            <div className="comment-component" onClick={ this.props.clickHandler }>
                <div className="author-header">
                    <span className="author-name">@{ this.props.author }</span>
                    { this.props.isArticleSentence && <span className="author-article"> (Article Author)</span> }
                    { this.props.replyTo && <span className="reply-to"> → <span className="reply-name">{ this.props.replyTo }</span></span> }
                </div>
                <div className="content">
                    <span className="previous">{ this.props.previousSentence } </span>
                    <span className="highlight">{ this.props.highlightSentence }</span>
                    <span className="next"> { this.props.nextSentence }</span>
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
    clickHandler: PropTypes.func
};
// CommentComponent.defaultProps = {};

export default CommentComponent;
