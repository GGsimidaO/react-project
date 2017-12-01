import {createStore,combineReducers} from 'redux';
import {homedata,detaildata,ticketdata,hasmore,datalist,getmore,resultlist,cartticket} from '../Reducer';
import thunk from 'redux-thunk';
import {applyMiddleware} from "redux";
const store=createStore(combineReducers({
	list:homedata,
	detaillist:detaildata,
	ticketlist:ticketdata,
	hasmore:hasmore,
	datalist:datalist,
	getmore:getmore,
	resultlist:resultlist,
	cartticket:cartticket
}),applyMiddleware(thunk));

export default store;