import React from "react";

type Props = {
  children?: React.ReactNode;
};

export interface State {
  user?: any;
}

export const initialState: State = {
  user: null,
};

export const UserContext = React.createContext<State | any>(initialState);

type Action = { type: "ADD_USER"; data: null } | { type: "REMOVE_USER" };

export function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        user: action.data,
      };
    }
    case "REMOVE_USER": {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
}

export const UserProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  const addUser = (data?: any) => dispatch({ type: "ADD_USER", data });
  const removeUser = () => dispatch({ type: "REMOVE_USER" });

  const value = React.useMemo(
    () => ({
      ...state,
      addUser,
      removeUser,
    }),
    [state]
  );
  return <UserContext.Provider value={value} {...props} />;
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};
