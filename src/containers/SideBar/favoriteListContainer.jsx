import React, { useEffect } from 'react';
import FavoriteList from '../../components/SideBar/favoriteList';
import { useSelector, useDispatch } from 'react-redux';
import { getfavoriteListActionCreator } from '../../redux/modules/selectedSymbol';

export default function FavoriteListContainer({ menu }) {
  let selectedStockSymbol = useSelector(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );
  let selectedCurrencySymbol = useSelector(
    (state) => state.selectedSymbol.selectedCurrencySymbol,
  );

  // let currencyList = useSelector(
  //   (state) => state.sidebarCurrency.sideBarCurrency,
  // );

  // let stockList = useSelector((state) => state.sideBarStock.sideBarStock);

  console.log(selectedStockSymbol);
  console.log(selectedCurrencySymbol);

  const dispatch = useDispatch();

  if (selectedStockSymbol.length !== 0) {
    localStorage.setItem('stockCount', JSON.stringify(selectedStockSymbol));
  }
  const getStockListElement = localStorage.getItem('stockCount');
  const getLocalStockList = JSON.parse(getStockListElement);

  if (selectedCurrencySymbol.length !== 0) {
    localStorage.setItem(
      'currencyCount',
      JSON.stringify(selectedCurrencySymbol),
    );
  }
  const getCurrencyListElement = localStorage.getItem('currencyCount');
  const getLocalCurrencyList = JSON.parse(getCurrencyListElement);

  useEffect(() => {
    dispatch(
      getfavoriteListActionCreator(getLocalStockList, getLocalCurrencyList),
    );
  }, []);

  const favoriteStockList = selectedStockSymbol.filter(
    (selectedStockSymbol) => {
      return selectedStockSymbol.count >= 3;
    },
  );

  const favoriteCurrencyList = selectedCurrencySymbol.filter(
    (selectedCurrencySymbol) => {
      return selectedCurrencySymbol.count >= 3;
    },
  );

  // if (currencyList.length !== 0) {
  //   currencyList = currencyList.map((currency, i) => ({
  //     ...currency,
  //     price: Object.values(currency['Time Series (Digital Currency Daily)'])[0][
  //       '1a. open (USD)'
  //     ],
  //   }));
  // }
  // console.log(currencyList);

  return (
    <FavoriteList
      favoriteStockList={favoriteStockList}
      favoriteCurrencyList={favoriteCurrencyList}
      // currencyList={currencyList}
      // stockList={stockList}
      // menu={menu}
    />
  );
}
