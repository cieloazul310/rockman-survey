export default function(playlist, key, sort) {
  const arr = [];
  playlist.forEach((d, i) => {
    if (i === 0) {
      arr.push({ type: key, [key]: d[key], tunes: [d] });
    } else {
      const target = arr.map(v => v[key]).indexOf(d[key]);
      if (target < 0) {
        arr.push({ type: key, [key]: d[key], tunes: [d] });
      } else {
        arr[target].tunes.push(d);
      }
    }
  });

  if (sort && typeof sort === 'function') {
    arr.sort(sort);
  }

  return arr;
}
