export default function getProperties(object) {
  const result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (!result.includes(property)) result.push(property);
  }

  let proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
}
