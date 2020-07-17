//---------------------------------------------------------------------

import { AlertAction, AlertActionTypes } from '../actions';

// ALERT STATE
export type AlertType = 'danger' | 'warning' | 'success';

export interface Alert {
  msg: string;
  type: AlertType;
  id: string;
}

const initalState: Alert[] = [];

//---------------------------------------------------------------------
// ALERT REDUCER
export const alert = (state: Alert[] = initalState, action: AlertAction) => {
  switch (action.type) {
    case AlertActionTypes.setAlert:
      return [...state, action.payload];

    case AlertActionTypes.removeAlert:
      return state.filter((alert) => alert.id !== action.payload);

    default:
      return state;
  }
};
