App.Views.Task.Index = Backbone.View.extend({
  events: {
    "click .toggle" : "toggleDone"
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    debugger;
    this.$el.html();
    this.$el.toggleClass('done', this.model.get('done'));
  },

  toggleDone: function() {
    this.model.toggleDone();
  }
})