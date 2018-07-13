export default function(playlist, keys, sort) {
  const arr = [];
  const isArray = Array.isArray(keys);
  const key = isArray ? keys[0] : keys;

  playlist.forEach((d, i) => {
    if (i === 0) {
      const neu = { type: key, [key]: d[key], tunes: [d] };
      if (isArray && keys.length) {
        for (let index = 1; index < keys.length; index++) {
          neu[keys[index]] = d[keys[index]];
        }
      }
      arr.push(neu);
    } else {
      const target = arr.map(v => v[key]).indexOf(d[key]);
      if (target < 0) {
        const neu = { type: key, [key]: d[key], tunes: [d] };
        if (isArray && keys.length) {
          for (let index = 1; index < keys.length; index++) {
            neu[keys[index]] = d[keys[index]];
          }
        }
        arr.push(neu);
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
