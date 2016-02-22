import alt from 'components/Dispatcher';

class FocusActions {
    setFocusedComment(id) {
        return { id };
    }
}

export default alt.createActions(FocusActions);
