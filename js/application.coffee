Backbone = require 'backbone'
_        = require 'underscore'

class Game extends Backbone.Model
  defaults:
    rows: 5
    cols: 5

class Cell extends Backbone.Model
  defaults:
    filled: false
  toggleFilled: ->
    @set('filled', not @get('filled'))

class CellView extends Backbone.View
  model: Cell
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

class GameView extends Backbone.View
  tagName: 'table'
  initialize: ->
    @model.bind 'change', @render, this
  render: ->
    @$el.html ''
    for row in [0..@model.get('rows')]
      element = $(document.createElement('tr'))
      for i in [0..@model.get('cols')]
        cell = new Cell
        cellView = new CellView model: cell
        element.append cellView.render().el
      @$el.append element
    this

class SettingsView extends Backbone.View
  model: Game
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

$.domReady ->
  game = new Game
  console.log game
  gameView = new GameView model: game
  settingsView = new SettingsView model: game
  console.log(settingsView)
  $('h1').bind 'click', ->
    alert 1
  $('#game').append gameView.render().el
  $('#settings').append settingsView.render().el

