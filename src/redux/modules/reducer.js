import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock'
import sidebarCurrency from './sidebarCurrency'
import currencyNow from './currencynow'
import detailStock from "./detailStock";
import selectedStock from './selectedStock'


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    selectedStock,
    router: connectRouter(history),
  })


export default reducer