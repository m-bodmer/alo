let TasksApp = Backbone.View.extend({
  el: $('#js-tasks'),

  initialize() {
    this.collection = new TasksCollection();
    this.listenTo(this.collection, 'add', this.renderTask);
    this.listenTo(this.collection, 'remove', this.renderTaskCount);
    this.collection.fetch();
  },

  renderTask(model) {
    model.view = new TaskView({model: model});
    this.$('#task-list').prepend(model.view.render());
    this.resetFormFields();
    this.renderTaskCount();
  },

  resetFormFields() {
    this.$('.task-manager__add textarea, .task-manager__add input[name="title"]').val(null);
  },

  renderTaskCount() {
    let length = this.collection.length;
    let count = length === 1 ? '1 Task' : length + ' Tasks';
    this.$('.task-count').text(count);
  },

  events: {
    'click button': 'createTask'
  },

  createTask(event) {
    event.preventDefault();

    // Create a new Task Model with the data in the form
    let task = {
      content: this.$('.task-manager__add textarea').val(),
      title: this.$('.task-manager__add input[name="title"]').val(),
      created_at: new Date()
    };

    // The `validate` option ensures that empty tasks aren't added
    this.collection.create(task, {validate: true});
  }
});