require('normalize.css');
require('styles/App.css');

import React from 'react';
import CommentComponent from 'components/CommentComponent';
import FocusCommentComponent from 'components/FocusCommentComponent';

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="main-container">
                    { this.props.lines.map((c, ind) => {
                        return (
                            <CommentComponent
                                key={ ind }
                                author={ c.author }
                                replyTo={ c.replyTo }
                                previousSentence={ c.previousSentence }
                                highlightSentence={ c.highlightSentence }
                                nextSentence={ c.nextSentence } />
                        );
                    }) }
                </div>
                <FocusCommentComponent />
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
            target: 1
        },
        {
            source: 1,
            target: 3
        }
    ]
};

export default AppComponent;
