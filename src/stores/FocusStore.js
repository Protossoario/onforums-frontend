import alt from 'components/Dispatcher';
import FocusActions from 'actions/FocusActions';

export class FocusStore {
    constructor() {
        this.bindActions(FocusActions);
        this.focusedComment = null;
    }

    onSetFocusedComment(data) {
        const { id } = data;
        this.focusedComment = id;
    }
}

export default alt.createStore(FocusStore, 'FocusStore');
