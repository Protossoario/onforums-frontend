require('normalize.css');
require('styles/App.css');

import React from 'react';
import CommentActions from 'actions/CommentActions';
import FocusActions from 'actions/FocusActions';
import CommentStore from 'stores/CommentStore';
import FocusStore from 'stores/FocusStore';
import CommentComponent from 'components/CommentComponent';
import FocusCommentComponent from 'components/FocusCommentComponent';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        Object.assign(this.state, CommentStore.getState());
        Object.assign(this.state, FocusStore.getState());
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onCommentChange(state) {
        this.setState(Object.assign(this.state, state));
    }

    onFocusChange(state) {
        this.setState(Object.assign(this.state, state));
    }

    componentWillMount() {
        CommentStore.listen(this.onCommentChange);
        FocusStore.listen(this.onFocusChange);

        CommentActions.setComments(this.props.lines);
        CommentActions.setLinks(this.props.links);
    }

    componentWillUnmount() {
        CommentStore.unlisten(this.onCommentChange);
        FocusStore.unlisten(this.onFocusChange);
    }

    handleCommentClick(ind) {
        FocusActions.setFocusedComment(ind);
    }

    handleCloseFocus(ev) {
        ev.preventDefault();
        FocusActions.setFocusedComment(null);
    }

    render() {
        const { comments, focusedComment } = this.state;
        return (
            <div className="index">
                <div className="main-container" onClick={ this.handleOutsideClick }>
                    { comments.map((c, ind) => {
                        return (
                            <CommentComponent
                                key={ ind }
                                author={ c.author }
                                replyTo={ c.replyTo }
                                previousSentence={ c.previousSentence }
                                highlightSentence={ c.highlightSentence }
                                nextSentence={ c.nextSentence }
                                clickHandler={ this.handleCommentClick.bind(this, ind) } />
                        );
                    }) }
                </div>
                { focusedComment != null && <FocusCommentComponent closeHandler={ this.handleCloseFocus } /> }
            </div>
        );
    }
}

AppComponent.defaultProps = {
    lines: [
        {
            id: 1,
            author: 'DarkHorse94',
            replyTo: null,
            previousSentence: '...lorem ipsum.',
            highlightSentence: 'Aliquam mattis eros ut leo bibendum, ut viverra justo viverra.',
            nextSentence: 'In at mauris ut nisi tempor egestas quis in purus...'
        },
        {
            id: 2,
            author: 'lemonpeper',
            replyTo: 'DarkHorse94',
            previousSentence: null,
            highlightSentence: 'Donec pharetra lacus et mauris auctor, et tincidunt mi aliquam.',
            nextSentence: null
        },
        {
            id: 3,
            author: 'OviWanKenobi',
            replyTo: null,
            previousSentence: 'Aliquam porta arcu et metus efficitur pretium.',
            highlightSentence: 'Nam consequat libero in risus molestie sollicitudin.',
            nextSentence: null
        }
    ],
    links: [
        {
            source: 2,
            target: 1,
            agree: true
        },
        {
            source: 1,
            target: 3,
            agree: false
        }
    ]
};

export default AppComponent;
