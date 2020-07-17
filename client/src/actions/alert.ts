//---------------------------------------------------------------------
// INTERFACES

import { AlertActionTypes } from './types';
import { AlertType, Alert } from '../reducers/alert';
import { v4 } from 'uuid';

export interface SetAlertDto {
  msg: string;
  type: AlertType;
}

interface SetAlertAction {
  type: AlertActionTypes.setAlert;
  payload: Alert;
}

//---------------------------------------------------------------------
// ACTION CREATORS

export const setAlert = (alert: SetAlertDto): SetAlertAction => {
  const { msg, type } = alert;
  const newAlert: Alert = {
    msg,
    type,
    id: v4(),
  };

  return {
    type: AlertActionTypes.setAlert,
    payload: newAlert,
  };
};

export type AlertAction = SetAlertAction;
