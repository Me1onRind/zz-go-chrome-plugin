function titleCase(str) {
  var array = str.toLowerCase().split("_");
  for (var i = 0; i < array.length; i++){
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  var string = array.join("");

  return string;
}

function indexOf(s, targets) {
    for (var i = 0; i < targets.length; i++) {
        var index = s.indexOf(targets[i])
        if (index >= 0) {
            return index
        }
    }
    return -1
}

export {indexOf, titleCase}
