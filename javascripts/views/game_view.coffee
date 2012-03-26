Backbone = require 'backbone'

class GOL.GameView extends Backbone.View
  tagName: 'table'
  initialize: ->
    @model.bind 'change', @render, this
  render: ->
    @$el.html ''
    for row in [0..@model.get('rows')]
      element = $(document.createElement('tr'))
      for i in [0..@model.get('cols')]
        cell = new GOL.Cell
        cellView = new GOL.CellView model: cell
        element.append cellView.render().el
      @$el.append element
    this
