let TaskView = Backbone.View.extend({
  tagName: 'li',
  className: 'task',
  template: HandlebarsTemplates['task'],

  events: {
    'click .delete': 'destroy'
  },

  initialize() {
    if (!this.model) {
      throw new Error('You must provide a Task model');
    }

    // Remove the view from the DOM
    this.listenTo(this.model, 'remove', this.remove);
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;
  },

  destroy(e) {
    e.preventDefault();
    this.model.destroy();
  }
});