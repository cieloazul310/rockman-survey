export default function csv2json(csv) {
  const rows = csv.split('\n');
  const keys = rows[0].split(',');

  return rows.filter((d, i) => i !== 0).map(d => {
    const vals = row2vals(d);
    const obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = vals[i];
    }
    return obj;
  });
}

function row2vals(row) {
  return row
    .split('"')
    .map((d, i) => {
      if (i % 2 === 0) return removeComma(d).split(',');
      else return [d];
    })
    .reduce((accum, curr) => accum.concat(curr), []);
}

function removeComma(str) {
  if (str.slice(0, 1) === ',') str = str.slice(1);
  if (str.slice(-1) === ',') str = str.slice(0, -1);
  return str;
}
