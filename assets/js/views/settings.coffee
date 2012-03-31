class GOL.Views.Settings extends Backbone.View
  model: GOL.Models.Game
  defaults:
    rows: 5
    cols: 5
  events:
    'change .rows': 'updateRows'
    'change .cols': 'updateCols'
  updateRows: ->
    @model.set('rows', $('#settings .rows').val())
  updateCols: ->
    @model.set('cols', $('#settings .cols').val())
  render: ->
    @$el.append('<input type="text" value="5" class="rows"/> <input type="text" value="5" class="cols"/>')
    this
