const initialState = {
  selectedUser: null,
  selectedUserPhoto: null,
  selectedUserName: null
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'postClicked': {
      return {
        selectedUser: action.uid,
        selectedUserPhoto: action.photo,
        selectedUserName: action.user
      }
    }
  }
}

export default Reducer;