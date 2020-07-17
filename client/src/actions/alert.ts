//---------------------------------------------------------------------
// INTERFACES

import { AlertActionTypes } from './types';
import { AlertType, Alert } from '../reducers/alert';
import { v4 } from 'uuid';
import { Dispatch } from 'react';

export interface SetAlertDto {
  msg: string;
  type: AlertType;
}

interface SetAlertAction {
  type: AlertActionTypes.setAlert;
  payload: Alert;
}

interface RemoveAlertAction {
  type: AlertActionTypes.removeAlert;
  payload: string;
}

//---------------------------------------------------------------------
// ACTION CREATORS

export const setAlert = (alert: SetAlertDto, timer: number = 5000) => (
  dispatch: Dispatch<any>
) => {
  const { msg, type } = alert;
  const newAlert: Alert = {
    msg,
    type,
    id: v4(),
  };

  dispatch({
    type: AlertActionTypes.setAlert,
    payload: newAlert,
  });

  setTimeout(() => {
    dispatch(removeAlert(newAlert.id));
  }, timer);
};

const removeAlert = (id: string) => ({
  type: AlertActionTypes.removeAlert,
  payload: id,
});

export type AlertAction = SetAlertAction | RemoveAlertAction;
