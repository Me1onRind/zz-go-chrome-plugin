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

function changeView(view) {
      $("#app").load(view+".html", function() {
          $(".index-box").each(function(){
              if (!$(this).attr("origin-color")) {
                $(this).attr("origin-color", $(this).css("background"))
              }
          })
          $(".index-box").mouseenter(function(){
              let borderColor = $(this).css("border-color")
              $(this).css("background", borderColor)
          })
          $(".index-box").mouseleave(function(){
              $(this).css("background", $(this).attr("origin-color"))
          })
          $(".index-box").click(function(){
              let view = $(this).attr("target")
              document.title = view
              changeView(view)
          })
      })
}

export {indexOf, titleCase, changeView}
