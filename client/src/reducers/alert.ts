//---------------------------------------------------------------------

import { AlertAction, AlertActionTypes } from '../actions';

// ALERT STATE
export type AlertType = 'danger' | 'warning' | 'success';

export interface Alert {
  msg: string;
  type: AlertType;
}

const initalState: Alert[] = [];

//---------------------------------------------------------------------
// ALERT REDUCER
export const alert = (state: Alert[] = initalState, action: AlertAction) => {
  switch (action.type) {
    case AlertActionTypes.setAlert:
      return [...state, action.payload];
    default:
      return state;
  }
};
