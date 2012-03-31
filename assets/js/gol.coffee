window.GOL =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    game = new GOL.Models.Game
    gameView = new GOL.Views.Game model: game
    settingsView = new GOL.Views.Settings model: game
    $('#game').append gameView.render().el
    $('#settings').append settingsView.render().el

$(document).ready ->
  GOL.init()
