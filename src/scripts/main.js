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

var ViewStates = { 
  states: [],

  add: function(state) {
    state.queryObj = matchMedia(state.query); 
    state.queryObj.addListener(function(mql){ 
      if (mql.matches) {
        setTimeout(function () {
          $(document).trigger('enterState', [state]);
        }, 0);
      } else {
        $(document).trigger('leaveState', [state]);
      }
    });
    this.states.push(state);
  },

  init: function() {
    for (var i = 0; i < this.states.length; i++) {
      var state = this.states[i];
      if (state.queryObj.matches) {
        $(document).trigger('enterState', [state]);
      }
    }
  }
};