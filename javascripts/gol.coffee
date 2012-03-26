window.GOL =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    game = new GOL.Game
    gameView = new GOL.GameView model: game
    settingsView = new GOL.SettingsView model: game
    $('h1').bind 'click', ->
      alert 1
    $('#game').append gameView.render().el
    $('#settings').append settingsView.render().el

$(document).ready ->
  GOL.init()
