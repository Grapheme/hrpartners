function wrapSlices($items, itemsPerBlock, wrapperHTML) {
  var items = $items.toArray();
  while (items.length) {
    var i = items.splice(0, itemsPerBlock);
    $(i).wrapAll(wrapperHTML);
  }
}


//- $(document).on('enterState', function(e, state) {
//-   console.log('-> ', state.id)
//- })

//- $(document).on('leaveState', function(e, state) {
//-   console.log('<- ', state.id)
//- })

function addStateEvent(options) {
  var m = matchMedia(options.query);
  m.addListener(function(mql){
    if (mql.matches) {
      setTimeout(function () {
        $(document).trigger('enterState', [options]);
      }, 0);
    } else {
      $(document).trigger('leaveState', [options]);
    }
  });

  if (m.matches) $(document).trigger('enterState', [options]);
}