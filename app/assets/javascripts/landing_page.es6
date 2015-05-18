let TaskModel = Backbone.Model.extend({
  initialize() {
    let date = moment(this.get('created_at'));
    this.set("formattedDate", date.fromNow());
  },

  validate(attrs) {
    if (!attrs.content) {
      return 'You have to say something about your task';
    }
  }
});

let TasksCollection = Backbone.Collection.extend({
  url: '/tasks',
  model: TaskModel
});

let template = HandlebarsTemplates['task'];

let TaskView = Backbone.View.extend({
  tagName: 'li',
  className: 'task',
  template: template,

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
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  },

  destroy(e) {
    e.preventDefault();
    this.model.destroy();
  }
});

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