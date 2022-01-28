import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import reducers from './Redux/reducers/index';

export default createStore(reducers, compose(applyMiddleware(thunk)));