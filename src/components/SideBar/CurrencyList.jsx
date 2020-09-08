import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Plot from "react-plotly.js";
import * as V from "victory";
import { getSelectedSymbolActionCreator } from "../../redux/modules/selectedSymbol";

export default function CurrencyList({
  currencyList,
  renderCurrencyList,
  menu,
}) {
  useEffect(() => {
    renderCurrencyList();
  }, [renderCurrencyList]);

  const dispatch = useDispatch();

  const sendSymbol = (e) => {
    e.stopPropagation();
    const selectedStock = e.target.querySelector("span").textContent;

    dispatch(getSelectedSymbolActionCreator(selectedStock, "currency"));
  };

  return (
    <ul className={menu ? "none" : ""}>
      {currencyList.map((currency) => {
        let currencys = [];
        const keys = Object.keys(
          currency["Time Series (Digital Currency Daily)"]
        ).reverse();
        const values = Object.values(
          currency["Time Series (Digital Currency Daily)"]
        )
          .map((item) => item["1a. open (USD)"])
          .reverse();
        keys.forEach((item, i) => {
          currencys.push({ date: item, price: values[i] });
        });
        // let color = currency.change[0] === "-" ? "green" : "red"

        return (
          <li onClick={sendSymbol}>
            {/* {currency.change} */}
            <span>{currency["Meta Data"]["2. Digital Currency Code"]}</span>
            {currency["Meta Data"]["3. Digital Currency Name"]}
            <V.VictoryLine
              data={currencys}
              x="date"
              y="price"
              style={{
                data: { stroke: "yellow" },
                parent: {
                  width: 50,
                  height: "auto",
                },
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

// <ul className={menu ? "none" : ""}>
//   {
//     currencyList.length && (currencyList.map((currency, i) => (

//       i < 10 && (<li><Plot
//         data={[
//           {
//             x: Object.keys(currency["Time Series (Digital Currency Daily)"]),
//             y: Object.values(currency["Time Series (Digital Currency Daily)"]).map(item => item["1a. open (USD)"]),
//             type: 'scatter',
//             mode: 'lines',
//           },
//         ]}
//         layout={{ width: 400, height: 250, title: currency["Meta Data"]["3. Digital Currency Name"] }}
//       />
//       </li>))
//     ))
//   }
// </ul>
