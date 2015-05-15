App.Routers.Tasks = Backbone.Router.extend({
  routes: {
    "tasks": "index",
  },

  index: function() {
    var collection, view;
    collection = new App.Collections.Tasks([
      {
        title: 1
      }, {
        title: 2
      }
    ]);

    view = new App.Views.Tasks.Index({
      collection: collection
    });

    $('body').html(view.el);

    view.render();
  }

});