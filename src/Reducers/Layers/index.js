import {
  SUCCESS_ADD_POINT,
} from './constant';

export default function (state = {}, action) {
  switch (action.type) {
    case SUCCESS_ADD_POINT: {
      return {...state, features: [...state.features, action.payload]};
    }
    default:
      return state;
  }
}