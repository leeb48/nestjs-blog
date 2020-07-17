//---------------------------------------------------------------------
// INTERFACES

import { Dispatch } from 'react';
import { AlertActionTypes } from './types';
import { AlertType } from '../reducers/alert';

export interface SetAlertDto {
  msg: string;
  type: AlertType;
}

interface SetAlertAction {
  type: AlertActionTypes.setAlert;
  payload: SetAlertDto;
}

//---------------------------------------------------------------------
// ACTION CREATORS

export const setAlert = (alert: SetAlertDto): SetAlertAction => ({
  type: AlertActionTypes.setAlert,
  payload: alert,
});

export type AlertAction = SetAlertAction;
