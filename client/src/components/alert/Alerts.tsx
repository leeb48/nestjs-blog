import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Alert } from '../../reducers/alert';
import './Alerts.scss';

interface AlertProps {
  alerts: Alert[];
}

const Alerts = ({ alerts }: AlertProps) => {
  const displayAlerts = alerts.map((alert) => (
    <div
      key={alert.id}
      className={`container notification is-${alert.type} is-light`}
    >
      {alert.msg}
    </div>
  ));

  return <Fragment>{alerts && displayAlerts}</Fragment>;
};

const mapStateToProps = (state: AppState) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Alerts);
