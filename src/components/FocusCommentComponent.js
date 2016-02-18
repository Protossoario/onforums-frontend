'use strict';

import React from 'react';
const FaThumbsUp = require('react-icons/lib/fa/thumbs-o-up');
const FaThumbsDown = require('react-icons/lib/fa/thumbs-o-down');

require('styles//FocusComment.sass');

class FocusCommentComponent extends React.Component {
    render() {
        return (
            <div className="focuscomment-component">
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
// FocusCommentComponent.propTypes = {};
// FocusCommentComponent.defaultProps = {};

export default FocusCommentComponent;
