'use strict';

import React, { Component, PropTypes } from 'react';
const FaThumbsUp = require('react-icons/lib/fa/thumbs-o-up');
const FaThumbsDown = require('react-icons/lib/fa/thumbs-o-down');
const FaTimes = require('react-icons/lib/fa/times');
const FaComment = require('react-icons/lib/fa/comment-o');

require('styles//FocusComment.sass');

class FocusCommentComponent extends Component {
    render() {
        const { sentence, replies, author } = this.props;
        let renderReplies = replies.map((r, ind) => {
            if (r.argument == 'in_favour') {
                return (
                    <p key={ ind } className="comment agree"><FaThumbsUp /> <span className="author-name">@{ r.replyAuthor }</span> { r.replySentence }</p>
                );
            } else if (r.argument == 'against') {
                return (
                    <p key={ ind } className="comment disagree"><FaThumbsDown /> <span className="author-name">@{ r.replyAuthor }</span> { r.replySentence }</p>
                );
            } else {
                return (
                    <p key={ ind } className="comment impartial"><FaComment /> <span className="author-name">@{ r.replyAuthor }</span> { r.replySentence }</p>
                )
            }
        });
        return (
            <div className="focuscomment-component">
                <a className="close-button" href="#" onClick={ this.props.closeHandler }><FaTimes /></a>
                <p className="author-said"><span className="author-name">@{ author }</span> said:</p>
                <p className="focus">{ sentence }</p>
                <hr />
                <p className="replies-header">Related comments by other users:</p>
                { renderReplies }
            </div>
        );
    }
}

FocusCommentComponent.displayName = 'FocusCommentComponent';

FocusCommentComponent.propTypes = {
    sentence: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
        PropTypes.object
    ),
    closeHandler: PropTypes.func,
    author: PropTypes.string
};
// FocusCommentComponent.defaultProps = {};

export default FocusCommentComponent;
