export function orderDateDesc(a, b) {
  return b.modificationTime - a.modificationTime;
}
export function orderDateAsc(a, b) {
  return a.modificationTime - b.modificationTime;
}
export function orderTitle(a, b) {
  return a.filename - b.filename;
}
export function orderDuration(a, b) {
  return a.duration - b.duration;
}
export function orderAlbum(albums, orderType) {
  const list = [...albums];
  if (orderType == 'fecha desc') {
    list.sort(orderDateDesc);
  }
  if (orderType == 'fecha asc') {
    list.sort(orderDateAsc);
  }
  if (orderType == 'titulo') {
    list.sort(orderTitle);
  }
  if (orderType == 'duration') {
    list.sort(orderDuration);
  }
  return list;
}
