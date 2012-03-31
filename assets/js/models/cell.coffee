class GOL.Models.Cell extends Backbone.Model
  defaults:
    filled: false
  toggleFilled: ->
    @set('filled', not @get('filled'))
