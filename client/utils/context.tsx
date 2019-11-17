import React from 'react';
import { AppState } from './types';
import { clearUser } from './storage';

const StateContext = React.createContext<AppState | undefined>(undefined);
const DispatchContext = React.createContext<any>(undefined);

function reducer(state, action) {
  switch (action.type) {
    case 'set-data':
      return { ...state, ...action.payload };
    case 'set-notifications':
      return { ...state, hasNotifications: true };
    case 'clear-notifications':
      return { ...state, hasNotifications: false };
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

// ---------- RESET PROVIDER ----------

const ResetContext = React.createContext<any>(undefined);

export const ResetProvider: React.FC<{ navigation: any }> = ({
  children,
  navigation,
}) => {
  const reset = React.useCallback(async () => {
    await clearUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Start' }],
    });
  }, [navigation]);

  return (
    <ResetContext.Provider value={reset}>{children}</ResetContext.Provider>
  );
};

export function useAppReset() {
  const reset = React.useContext(ResetContext);
  if (reset === undefined) {
    throw new Error('useAppReset must be used within a ResetProvider');
  }
  return reset;
}
