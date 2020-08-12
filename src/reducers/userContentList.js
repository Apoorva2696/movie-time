
const _state = {
    results: []
};


const userContentList = (state = _state, action) => {
    switch (action.type) {
      case 'UPDATE_USER_CONTENT_LIST':
        state.results.push( action.item );
        return {
          ...state
        }
      default:
        return state
    }
  }
  
  export default userContentList;