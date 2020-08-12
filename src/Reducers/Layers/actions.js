import {
  SUCCESS_ADD_POINT,
} from './constant';

export function addPoint({points, properties}) {
  const newPoint = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: points,
    },
    properties,
  };

  return ({
    type: SUCCESS_ADD_POINT,
    payload: newPoint,
  });
};