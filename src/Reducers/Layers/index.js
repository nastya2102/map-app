import {
  SUCCESS_ADD_POINT,
} from './constant';

const defaultState = {
  type: 'FeatureCollection',
  features: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SUCCESS_ADD_POINT: {
      return {...state, features: [...state.features, action.payload]};
    }
    default:
      return state;
  }
}