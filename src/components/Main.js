require('normalize.css');
require('styles/App.css');

import React from 'react';
import CommentComponent from 'components/CommentComponent';

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                { this.props.comments.map((c, ind) => {
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
        );
    }
}

AppComponent.defaultProps = {
    comments: [
        {
            author: 'DarkHorse94',
            replyTo: null,
            previousSentence: '...lorem ipsum.',
            highlightSentence: 'Aliquam mattis eros ut leo bibendum, ut viverra justo viverra.',
            nextSentence: 'In at mauris ut nisi tempor egestas quis in purus...'
        },
        {
            author: 'lemonpeper',
            replyTo: 'DarkHorse94',
            previousSentence: '',
            highlightSentence: 'Donec pharetra lacus et mauris auctor, et tincidunt mi aliquam.',
            nextSentence: ''
        }
    ]
};

export default AppComponent;
