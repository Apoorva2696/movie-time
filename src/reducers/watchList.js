
const _state = {
    results: []
};


const watchList = (state = _state, action) => {
    switch (action.type) {
      case 'UPDATE_WATCH_LIST':
        state.results.push( action.item );
        return {
          ...state
        }
      default:
        return state
    }
  }
  
  export default watchList;