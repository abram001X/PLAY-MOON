export default function orderDate(a, b) {
  return a.modificationTime - b.modificationTime;
}
export function orderTitle(a, b) {
  return a.filename - b.filename;
}
export function orderDuration(a, b) {
  return a.duration - b.duration;
}