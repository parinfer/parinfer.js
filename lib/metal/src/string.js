Parinfer.string = (function(){

  function insert(orig, idx, insert) {
    return (
      orig.substring(0, idx) +
      insert +
      orig.substring(idx)
    );
  }

  function replaceRange(orig, start, end, replace) {
    return (
      orig.substring(0, start) +
      replace +
      orig.substring(end)
    );
  }

  function removeRange(orig, start, end) {
    return (
      orig.substring(0, start) +
      orig.substring(end)
    );
  }

  return {
    insert: insert,
    replaceRange: replaceRange,
    removeRange: removeRange
  };

})();
