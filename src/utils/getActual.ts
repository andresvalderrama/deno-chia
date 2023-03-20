export default function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
}
