import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { AuthState } from './reducers/auth';
import { Alert } from './reducers/alert';

export interface AppState {
  alert: Alert[];
  auth: AuthState;
}

const middleware: Middleware[] = [thunk];

export function configureStore(): Store<AppState> {
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
}
