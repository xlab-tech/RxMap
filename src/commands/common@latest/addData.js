
import Map from '../../core/RxMap';

const addData = function (context, typeId, data) {
  const { RxMap } = context;
  const type = RxMap.getDataType(typeId);
  if (!type) {
    throw new Error(`Not type ${typeId} register`);
  }
  switch (type.geomType) {
    case 'point':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.point(element, type.style, element), RxMap)
          .subscribe((last, all) => resolve(all));
      });
    case 'marker':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.marker(element, type.style, element), RxMap)
          .subscribe((last, all) => resolve(all));
      });

    default:
      return null;
  }
};

Map.register('addData', addData);

export default addData;
