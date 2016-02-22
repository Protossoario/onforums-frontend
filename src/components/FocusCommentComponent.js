'use strict';

import React, { Component, PropTypes } from 'react';
const FaThumbsUp = require('react-icons/lib/fa/thumbs-o-up');
const FaThumbsDown = require('react-icons/lib/fa/thumbs-o-down');
const FaTimes = require('react-icons/lib/fa/times');

require('styles//FocusComment.sass');

class FocusCommentComponent extends Component {
    render() {
        return (
            <div className="focuscomment-component">
                <a className="close-button" href="#" onClick={ this.props.closeHandler }><FaTimes /></a>
                <p className="focus">Aliquam mattis eros ut leo bibendum, ut viverra justo viverra.</p>
                <hr />
                <p className="comment agree"><FaThumbsUp /> Mauris ut volutpat odio.</p>
                <p className="comment disagree"><FaThumbsDown /> Nam vitae laoreet mauris!</p>
            </div>
        );
    }
}

FocusCommentComponent.displayName = 'FocusCommentComponent';

// Uncomment properties you need
FocusCommentComponent.propTypes = {
    closeHandler: PropTypes.func
};
// FocusCommentComponent.defaultProps = {};

export default FocusCommentComponent;
