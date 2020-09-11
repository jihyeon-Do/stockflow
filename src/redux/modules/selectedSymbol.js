import {
  put,
  takeLatest,
  select
} from 'redux-saga/effects';


const prefix = 'stockflow/selectedSymbol';

// action type
const START = `${prefix}/START`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

/*
  [
    {
      symbol: MMM,
      count: 1
    }
  ]
*/

// initial state
const initialState = {
  selectedStockSymbol: [],
  selectedCurrencySymbol: [],
  loading: false,
  error: null,
};

// action creator
const selectedSymbolStart = () => ({
  type: START,
});

const selectedSymbolSuccess = (selectedSymbol, names) => ({
  type: SUCCESS,
  selectedSymbol,
  names,
});

const selectedSymbolFail = (error) => ({
  type: FAIL,
  error,
});

function* getSelectedSymbolSaga(action) {
  let selectedStockSymbol = yield select(
    (state) => state.selectedSymbol.selectedStockSymbol,
  );

  let selectedCurrencySymbol = yield select(
    (state) => state.selectedSymbol.selectedCurrencySymbol,
  );

  let names = action.payload.names;

  console.log(selectedStockSymbol);
  console.log(selectedCurrencySymbol);
  console.log(names);

  if (names === 'stock') {
    if (
      // 같은 symbol이 없을때 새로운 symbol 추가
      selectedStockSymbol.filter(
        (symbol) => symbol.symbol === action.payload.selectedSymbol,
      ).length === 0
    ) {
      selectedStockSymbol = [
        ...selectedStockSymbol,
        {
          symbol: action.payload.selectedSymbol,
          count: 1,
        },
      ];
    } else {
      // 만약 이미 추가된 symbol이라면 count만 + 1
      selectedStockSymbol = selectedStockSymbol.map((symbol) =>
        symbol.symbol === action.payload.selectedSymbol ?
        {
          ...symbol,
          count: symbol.count + 1,
        } :
        symbol,
      );
    }
    yield put(selectedSymbolStart());
    try {
      yield put(selectedSymbolSuccess(selectedStockSymbol, names));
    } catch (error) {
      yield put(selectedSymbolFail(error));
    }
  } else {
    if (
      // 같은 symbol이 없을때 새로운 symbol 추가
      selectedCurrencySymbol.filter(
        (symbol) => symbol.symbol === action.payload.selectedSymbol,
      ).length === 0
    ) {
      selectedCurrencySymbol = [
        ...selectedCurrencySymbol,
        {
          symbol: action.payload.selectedSymbol,
          count: 1,
        },
      ];
    } else {
      // 만약 이미 추가된 symbol이라면 count만 + 1
      selectedCurrencySymbol = selectedCurrencySymbol.map((symbol) =>
        symbol.symbol === action.payload.selectedSymbol ?
        {
          ...symbol,
          count: symbol.count + 1,
        } :
        symbol,
      );
    }
    yield put(selectedSymbolStart());
    try {
      yield put(selectedSymbolSuccess(selectedCurrencySymbol, names));
    } catch (error) {
      yield put(selectedSymbolFail(error));
    }
  }
}

const GET_SELECTEDSYMBOL_SAGA = 'GET_SELECTEDSYMBOL_SAGA';
export const getSelectedSymbolActionCreator = (selectedSymbol, names) => ({
  type: GET_SELECTEDSYMBOL_SAGA,
  payload: {
    selectedSymbol,
    names,
  },
});

export function* selectedSymbolSaga() {
  yield takeLatest(GET_SELECTEDSYMBOL_SAGA, getSelectedSymbolSaga);
}

// reducer

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case SUCCESS:
      if (action.names === 'stock') {
        return {
          ...prevState,
          loading: false,
          selectedStockSymbol: action.selectedSymbol,
          error: null,
        };
      } else {
        return {
          ...prevState,
          loading: false,
          selectedCurrencySymbol: action.selectedSymbol,
          error: null,
        };
      }
      case FAIL:
        return {
          ...prevState,
          loading: false,
            error: action.error,
        };
      default:
        return {
          ...prevState,
        };
  }
}