(function() {
  var Backbone, Cell, CellView, Game, GameView, RowView, _,
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
      board: [],
      rows: 5,
      cols: 5
    };

    Game.prototype.initialize = function() {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.get('rows'); 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        _results.push((function() {
          var _base, _base2, _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = this.get('cols'); 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            (_base = this.get('board'))[y] || (_base[y] = []);
            _results2.push((_base2 = this.get('board')[y])[x] || (_base2[x] = new Cell()));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    return Game;

  })(Backbone.Model);

  RowView = (function(_super) {

    __extends(RowView, _super);

    function RowView() {
      RowView.__super__.constructor.apply(this, arguments);
    }

    RowView.prototype.defaults = {
      size: 5
    };

    RowView.prototype.initialize = function() {};

    return RowView;

  })(Backbone.View);

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
      console.log('woot');
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

    GameView.prototype.render = function() {
      var board, cell, cellView, element, row, _i, _j, _len, _len2;
      board = this.model.get('board');
      for (_i = 0, _len = board.length; _i < _len; _i++) {
        row = board[_i];
        element = $(document.createElement('tr'));
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
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

  $.domReady(function() {
    var game, gameView;
    game = new Game;
    console.log(game);
    gameView = new GameView({
      model: game
    });
    $('h1').bind('click', function() {
      return alert(1);
    });
    return $('#game').append(gameView.render().el);
  });

}).call(this);
