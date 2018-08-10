
import Map from '../../core/RxMap';

const addData = function (typeId, data) {
  const rxMap = this.getRxMap();
  const type = rxMap.getDataType(typeId);
  if (!type) {
    throw new Error(`Not type ${typeId} register`);
  }
  switch (type.geomType) {
    case 'point':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.point(element, type.style, element), rxMap)
          .subscribe((last, all) => resolve(all));
      });
    case 'marker':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.marker(element, type.style, element), rxMap)
          .subscribe((last, all) => resolve(all));
      });

    default:
      return null;
  }
};

Map.register('addData', addData);

export default addData;
