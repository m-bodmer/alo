App.Models.Task = Backbone.Model.extend({
  // Default attributes for the task item.
  defaults: {
    title: "Default TODO title",
    done: false
  },

  // Toggle the `done` state of this task item.
  toggleDone: function() {
    this.save({done: !this.get("done")});
  }
});

// var App.Collections.Tasks = Backbone.Collection.extend({
//   url: '/tasks',
//   model: Task,

//   // Filter down the list of all task items that are finished.
//   done: function() {
//     return this.where({done: true});
//   }
// });