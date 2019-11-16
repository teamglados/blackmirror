import React from 'react';
import { AppState } from './types';

const StateContext = React.createContext<AppState | undefined>(undefined);
const DispatchContext = React.createContext<any>(undefined);

function reducer(state, action) {
  switch (action.type) {
    case 'set-data':
      return action.payload;
    case 'clear-data':
      return null;
    default:
      throw new Error('Unhandled action');
  }
}

export const DataProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, null);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export function useAppDispatch() {
  const dispatch = React.useContext(DispatchContext);
  if (dispatch === undefined) {
    throw new Error('useDispatch must be used within a DispatchProvider');
  }
  return dispatch;
}

export function useAppState() {
  const state = React.useContext(StateContext);
  if (state === undefined) {
    throw new Error('useState must be used within a StateProvider');
  }
  return state;
}
