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

        CommentActions.setComments(this.props.mockComments);
        CommentActions.setLinks(this.props.mockLinks);
        CommentActions.setSentences(this.props.mockSentences);
        CommentActions.setSentenceRanking(this.props.mockRanking);
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
        const { comments, focusedComment, sentences, sentenceRanking, sentenceLinks } = this.state;
        let rankedSentences = Object.keys(sentenceRanking).map((sId) => {
            for (let cId in comments) {
                let comment = comments[cId];
                let sentenceIndex = comment.sentences.indexOf(sId);
                if (sentenceIndex !== -1) {
                    let prevSentId, nextSentId;

                    if (sentenceIndex > 0) {
                        prevSentId = comment.sentences[sentenceIndex - 1];
                    }

                    if (sentenceIndex < comment.sentences.length - 1) {
                        nextSentId = comment.sentences[sentenceIndex + 1];
                    }

                    return (
                        <CommentComponent
                            key={ sId }
                            author={ comment.bloggerId }
                            replyTo={ comment.parent ? comments[comment.parent].bloggerId : null }
                            previousSentence={ prevSentId ? sentences[prevSentId] : null }
                            highlightSentence={ sentences[sId] }
                            nextSentence={ nextSentId ? sentences[nextSentId] : null }
                            clickHandler={ this.handleCommentClick.bind(this, sId) } />
                    );
                }
            }
            // if the sentence is not found in any comment, it must belong to the article text
            return (
                <CommentComponent
                    key={ sId }
                    isArticleSentence={ true }
                    author={ this.props.mockAuthorName }
                    highlightSentence={ sentences[sId] }
                    clickHandler={ this.handleCommentClick.bind(this, sId) } />
            );
        });

        let focusSidebar = null;
        if (focusedComment != null) {
            let sentence = sentences[focusedComment];
            let replies = sentenceLinks[focusedComment].map((r) => {
                r.replySentence = sentences[r.reply];
                return r;
            });
            focusSidebar = (
                <FocusCommentComponent
                    sentence={ sentence }
                    replies={ replies }
                    closeHandler={ this.handleCloseFocus } />
            );
        }
        return (
            <div className="index">
                <div className="main-container" onClick={ this.handleOutsideClick }>
                    { rankedSentences }
                </div>
                { focusSidebar }
            </div>
        );
    }
}

AppComponent.defaultProps = {
    mockAuthorName: 'Rupert Neate',
    mockSentences: {
        's0': 'Undervaluing Royal Mail shares cost taxpayers £750m in one day',
        's1': 'The government\'s desperation to sell Royal Mail cost taxpayers £750m in a single day, the National Audit Office has said in a scathing report into the privatisation of the 500-year-old national institution.',
        's10': 'Amyas Morse, head of the audit office, said: \"The department was very keen to achieve its objective of selling Royal Mail, and was successful in getting the company listed on the FTSE 100.',
        's18': 'At the time, Cable said: \"We wanted to make sure that the company started its new life with a core of high quality investors who would be there in good times and bad, interested in Royal Mail and the universal service it provides for consumers over the long term.',
        's21': 'A large proportion of their shares were gobbled up by hedge funds, which Cable has repeatedly attacked for being short term investors, describing them as \"spivs and gamblers\".',
        's25': 'The audit office also criticised the government for relying too heavily on its advisers, predominately the investment bank Lazard.',
        's41': 'And will anyone be sacked for incompetency and wasting public (yours and mine) money?',
        's42': 'Of course not.',
        's50': 'wasting public (yours and mine) money And from the headline : Undervaluing Royal Mail shares costs taxpayer £750m This isn\'t the correct way to look at things.',
        's51': 'The scandal isn\'t that taxpayers are losing out, in some technical accounting error.',
        's52': 'It\'s that privatisation has succeeded in transferring wealth from the less well-off to the better-off.',
        's53': 'That\'s the whole purpose of privatisation, and it worked well in this case, with £750 million in effect being transferred upwards.',
        's54': 'How could anyone think of re electing this appalling rouge government?',
        's61': 'This privatisation is bad news anyway.',
        's62': 'The speculators will clean up, already have actually but watch the mail prices shoot up, they already have too, what am I saying.',
        's63': 'We, the tax payers, have been badly conned yet again.',
        's64': 'Bad for jobs too.',
        's65': 'contemptuously ignored.',
        's66': 'every party does this.',
        's70': 'But we haven\'t, have we?',
        's82': 'The tax payer stuffed yet again as we have been every time a national asset has been given away.',
        's83': 'I will vote for any party which stands on a platform of re nationalising these companies of national interest.',
        's84': '"For no compensation too, they have profiteered out of what was our common property and wealth" Except those that have really profiteered have already flogged their shares making giant profits for nil work.',
        's85': 'This is presumably what the government means by wealth creators .......unfortunately it is wealth that goes into their ( offshore ?',
        's88': 'For no compensation too, they have profiteered out of what was our common property and wealth.',
        's89': 'Oh and how about time inside for those that flogged it off for pennies on the pound too.',
        's95': 'yes, who is the SPIV now??',
        's101': 'That would have been enough to pay up-rated pensions to frozen pensioners in the Commonwealth for a year and a half (see www.parity-warrior.com).',
        's102': 'But then, we know that this Coalition government are only interested in channelling more money to the fat cats - bankers and hedge funds.',
        's104': 'This is all part of a process, which started back in Tudor times, called \'Enclosure\'.',
        's105': 'In those days it was land.',
        's106': 'And the rich and powerful stole it off the poor and weak, without any compensation.',
        's107': 'All the poor were left with were a few bits of scrubby common land that was good for nothing.',
        's108': 'Now the rich and powerful can\'t steal in quite the same way, but steal they still do.',
        's126': 'Cable needs to retire, maybe he should be sold off at the lowest possible price',
        's127': 'Cable has already sold his soul for a place in the treasury.',
        's128': 'the whole of the lib dems need to retire - traitors',
        's137': 'Stroke of genius from Osborne.',
        's138': 'Cable is the face of selling of Royal Mail, and forever will be.',
        's157': 'The words \'gentleman\'s agreement\' and The City are no longer appropriate, trust in The City and our Banking & Financial Services institutions is at an all time low.'
    },
    mockComments: {
        'c0': {
            'bloggerId': 'richardbj',
            'sentences': [ 's41', 's42', 's43', 's44', 's45', 's46', 's47', 's48' ]
        },
        'c2': {
            'bloggerId': 'WaterloggedGlitch',
            'sentences': [ 's50', 's51', 's52', 's53' ]
        },
        'c3': {
            'bloggerId': 'teacuprider',
            'sentences': [ 's54' ]
        },
        'c5': {
            'bloggerId': 'billybuzz53',
            'sentences': [ 's61', 's62', 's63', 's64' ]
        },
        'c6': {
            'bloggerId': 'GoddessOFblah',
            'sentences': [ 's65', 's66', 's67' ]
        },
        'c8': {
            'bloggerId': 'MaltnHops',
            'sentences': [ 's69', 's70', 's71', 's72' ]
        },
        'c14': {
            'bloggerId': 'OFFMYBACK',
            'sentences': [ 's82', 's83' ]
        },
        'c15': {
            'bloggerId': 'stfcbob',
            'sentences': [ 's84', 's85', 's86', 's87' ]
        },
        'c16': {
            'bloggerId': 'alex13',
            'sentences': [ 's88', 's89' ]
        },
        'c20': {
            'bloggerId': 'chevychase',
            'sentences': [ 's95' ]
        },
        'c23': {
            'bloggerId': 'paritywarrior',
            'sentences': [ 's100', 's101', 's102' ]
        },
        'c25': {
            'bloggerId': 'bateleur',
            'sentences': [ 's104', 's105', 's106', 's107', 's108', 's109', 's110', 's111', 's112', 's113', 's114', 's115', 's116', 's117' ]
        },
        'c28': {
            'bloggerId': 'chevychase',
            'sentences': [ 's126' ]
        },
        'c29': {
            'bloggerId': 'questionandfreedom',
            'sentences': [ 's127' ]
        },
        'c30': {
            'bloggerId': 'GoddessOFblah',
            'sentences': [ 's128' ]
        },
        'c35': {
            'bloggerId': 'WakeUpArgh',
            'sentences': [ 's137', 's138' ]
        },
        'c42': {
            'bloggerId': 'DJT1Million',
            'sentences': [ 's155', 's156', 's157', 's158', 's159', 's160', 's161', 's162', 's163', 's164', 's165', 's166', 's167' ]
        }
    },
    mockLinks: {
        's0': [
            {
                reply: 's53',
                argument: 'against'
            },
            {
                reply: 's64',
                argument: 'impartial'
            },
            {
                reply: 's105',
                argument: 'in_favour'
            },
            {
                reply: 's157',
                argument: 'in_favour'
            }
        ],
        's1': [
            {
                reply: 's53',
                argument: 'against'
            }
        ],
        's10': [
            {
                reply: 's137',
                argument: 'against'
            }
        ],
        's18': [
            {
                reply: 's157',
                argument: 'in_favour'
            }
        ],
        's21': [
            {
                reply: 's95',
                argument: 'in_favour'
            },
            {
                reply: 's102',
                argument: 'impartial'
            }
        ],
        's25': [
            {
                reply: 's65',
                argument: 'in_favour'
            }
        ],
        's41': [
            {
                reply: 's54',
                argument: 'impartial'
            }
        ],
        's53': [
            {
                reply: 's0',
                argument: 'against'
            },
            {
                reply: 's1',
                argument: 'against'
            },
            {
                reply: 's61',
                argument: 'against'
            }
        ],
        's54': [
            {
                reply: 's41',
                argument: 'impartial'
            }
        ],
        's61': [
            {
                reply: 's53',
                argument: 'against'
            },
            {
                reply: 's65',
                argument: 'in_favour'
            }
        ],
        's63': [
            {
                reply: 's70',
                argument: 'against'
            }
        ],
        's64': [
            {
                reply: 's0',
                argument: 'impartial'
            }
        ],
        's65': [
            {
                reply: 's25',
                argument: 'in_favour'
            },
            {
                reply: 's61',
                argument: 'in_favour'
            }
        ],
        's70': [
            {
                reply: 's63',
                argument: 'against'
            }
        ],
        's82': [
            {
                reply: 's88',
                argument: 'in_favour'
            },
            {
                reply: 's84',
                argument: 'in_favour'
            }
        ],
        's84': [
            {
                reply: 's82',
                argument: 'in_favour'
            }
        ],
        's88': [
            {
                reply: 's82',
                argument: 'in_favour'
            }
        ],
        's95': [
            {
                reply: 's21',
                argument: 'in_favour'
            }
        ],
        's102': [
            {
                reply: 's21',
                argument: 'impartial'
            }
        ],
        's105': [
            {
                reply: 's0',
                argument: 'in_favour'
            }
        ],
        's126': [
            {
                reply: 's128',
                argument: 'impartial'
            },
            {
                reply: 's127',
                argument: 'impartial'
            }
        ],
        's127': [
            {
                reply: 's126',
                argument: 'impartial'
            }
        ],
        's128': [
            {
                reply: 's126',
                argument: 'impartial'
            }
        ],
        's137': [
            {
                reply: 's10',
                argument: 'against'
            }
        ],
        's157': [
            {
                reply: 's0',
                argument: 'in_favour'
            },
            {
                reply: 's18',
                argument: 'in_favour'
            }
        ]
    },
    mockRanking: {
        's0': 4,
        's53': 3,
        's21': 2,
        's61': 2,
        's65': 2,
        's82': 2,
        's126': 2,
        's157': 2
    }
};

export default AppComponent;
