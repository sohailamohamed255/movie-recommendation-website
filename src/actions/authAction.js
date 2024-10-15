export const login = (userData) => (dispatch) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: userData,
    });
  };
  
  export const logout = () => (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  