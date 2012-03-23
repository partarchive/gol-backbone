(function() {
  var Backbone, Cell, CellView, Game, GameView, SettingsView, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Backbone = require('backbone');

  _ = require('underscore');

  Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.defaults = {
      rows: 5,
      cols: 5
    };

    return Game;

  })(Backbone.Model);

  Cell = (function(_super) {

    __extends(Cell, _super);

    function Cell() {
      Cell.__super__.constructor.apply(this, arguments);
    }

    Cell.prototype.defaults = {
      filled: false
    };

    Cell.prototype.toggleFilled = function() {
      return this.set('filled', !this.get('filled'));
    };

    return Cell;

  })(Backbone.Model);

  CellView = (function(_super) {

    __extends(CellView, _super);

    function CellView() {
      CellView.__super__.constructor.apply(this, arguments);
    }

    CellView.prototype.model = Cell;

    CellView.prototype.tagName = 'td';

    CellView.prototype.initialize = function() {
      return this.model.bind('change', this.render, this);
    };

    CellView.prototype.events = {
      'click': 'toggleFilled'
    };

    CellView.prototype.toggleFilled = function() {
      return this.model.toggleFilled();
    };

    CellView.prototype.render = function() {
      if (this.model.get('filled')) {
        this.$el.addClass('filled');
      } else {
        this.$el.removeClass('filled');
      }
      this.$el.html;
      return this;
    };

    return CellView;

  })(Backbone.View);

  GameView = (function(_super) {

    __extends(GameView, _super);

    function GameView() {
      GameView.__super__.constructor.apply(this, arguments);
    }

    GameView.prototype.tagName = 'table';

    GameView.prototype.initialize = function() {
      return this.model.bind('change', this.render, this);
    };

    GameView.prototype.render = function() {
      var cell, cellView, element, i, row, _ref, _ref2;
      this.$el.html('');
      for (row = 0, _ref = this.model.get('rows'); 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
        element = $(document.createElement('tr'));
        for (i = 0, _ref2 = this.model.get('cols'); 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
          cell = new Cell;
          cellView = new CellView({
            model: cell
          });
          element.append(cellView.render().el);
        }
        this.$el.append(element);
      }
      return this;
    };

    return GameView;

  })(Backbone.View);

  SettingsView = (function(_super) {

    __extends(SettingsView, _super);

    function SettingsView() {
      SettingsView.__super__.constructor.apply(this, arguments);
    }

    SettingsView.prototype.model = Game;

    SettingsView.prototype.defaults = {
      rows: 5,
      cols: 5
    };

    SettingsView.prototype.events = {
      'change .rows': 'updateRows',
      'change .cols': 'updateCols'
    };

    SettingsView.prototype.updateRows = function() {
      return this.model.set('rows', $('#settings .rows').val());
    };

    SettingsView.prototype.updateCols = function() {
      return this.model.set('cols', $('#settings .cols').val());
    };

    SettingsView.prototype.render = function() {
      this.$el.append('<input type="text" value="5" class="rows"/> <input type="text" value="5" class="cols"/>');
      return this;
    };

    return SettingsView;

  })(Backbone.View);

  $.domReady(function() {
    var game, gameView, settingsView;
    game = new Game;
    console.log(game);
    gameView = new GameView({
      model: game
    });
    settingsView = new SettingsView({
      model: game
    });
    console.log(settingsView);
    $('h1').bind('click', function() {
      return alert(1);
    });
    $('#game').append(gameView.render().el);
    return $('#settings').append(settingsView.render().el);
  });

}).call(this);
