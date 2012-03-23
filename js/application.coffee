Backbone = require 'backbone'
_ = require 'underscore'

class Game extends Backbone.Model
  defaults:
    board: []
    rows: 5
    cols: 5
  initialize: ->
    for y in [0..@get('rows')]
      for x in [0..@get('cols')]
        @get('board')[y] ||= []
        @get('board')[y][x] ||= new Cell()

class RowView extends Backbone.View
  defaults:
    size: 5
  initialize: ->


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
    console.log 'woot'
    if @model.get('filled')
      @$el.addClass('filled')
    else
      @$el.removeClass('filled')
    @$el.html
    this

class GameView extends Backbone.View
  tagName: 'table'
  render: ->
    board = @model.get('board')
    for row in board
      element = $(document.createElement('tr'))
      for cell in row
        cellView = new CellView model: cell
        element.append cellView.render().el
      @$el.append element
    this


$.domReady ->
  game = new Game
  console.log game
  gameView = new GameView
    model: game
  $('h1').bind 'click', ->
    alert 1
  $('#game').append gameView.render().el

