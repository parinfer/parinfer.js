
function insert(orig, idx, insert) {
  return (
    orig.substr(0, idx) +
    insert +
    orig.substr(idx)
  );
}

function removeRange(orig, start, end) {
  return (
    orig.substr(0, start) +
    orig.substr(end)
  );
}
