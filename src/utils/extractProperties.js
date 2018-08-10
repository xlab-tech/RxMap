
const extractProperties = (item) => {
  if (!item || Array.isArray(item)) {
    return {};
  }
  if (item.properties) {
    return extractProperties(item.properties);
  }
  if (item.attributes) {
    return extractProperties(item.attributes);
  }
  if (item.fields) {
    return extractProperties(item.fields);
  }
  return item;
};

export default extractProperties;
