
const addData = (context, typeId, data) => {
  const { source } = context;
  const type = source.getDataType(typeId);
  if (!type) {
    throw new Error(`Not type ${typeId} register`);
  }
  switch (type.geomType) {
    case 'point':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.point(element, type.style, element), source)
          .subscribe((last, all) => resolve(all));
      });
    case 'marker':
      return new Promise((resolve) => {
        data.reduce((map, element) => map.marker(element, type.style, element), source)
          .subscribe((last, all) => resolve(all));
      });

    default:
      return null;
  }
};

export default addData;
