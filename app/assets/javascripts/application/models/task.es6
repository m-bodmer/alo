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