class GOL.CellView extends Backbone.View
  model: GOL.Cell
  tagName: 'td'
  initialize: ->
    @model.bind 'change', @render, this
  events:
    'click': 'toggleFilled'
  toggleFilled: ->
    @model.toggleFilled()
  render: ->
    if @model.get('filled')
      @$el.addClass('filled')
    else
      @$el.removeClass('filled')
    @$el.html
    this
