import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './logboard.html';

import { Logs } from '../api/lists/lists.js';
import '../api/lists/methods.js';

Template.logboard.onCreated(function() {
    Meteor.call(
      "seedDatabase",
      function(err, result) {
        if (err) {
            console.log("Could not seed databse: " + err.reason);
          }
        }
    );
    //initialization, we can access template instance at this, but we must store before autorun
    var instance = this;
    //initalize reactive variables
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(50);
    instance.newItems = new ReactiveVar(false);


    //autorun defines special reactive zones which will re-run anytime something (a reactive thing) changes
    //setting it up directly on template instance and not tracker to ensure it will be stopped when template is destroyed and we no longer need it
    instance.autorun(function() {
      //this whole block will rerun anytime limit changes
      // console.log("Current count in db", Logs.find().count() )
      var limit = instance.limit.get();
      console.log("Asking for", limit, " posts...")
      var subscription = instance.subscribe('logs', limit);

      //is subscription is ready set limit to newLimit
      if (subscription.ready()) {
        console.log("> Received ", limit," posts. \n\n");
        //giving green flag to safely display more posts
        instance.loaded.set(limit);
        instance.newItems.set(false);
      } else {
        console.log("> Subscription is not ready yet. \n\n");
      }
      });
      //logs is a reactive data source since it calls another reactive data source (loaded.get()
      //so it will re-run whenever its data sources reactively change
      instance.logs = function() {
        return Logs.find({}, {limit: instance.loaded.get(),
                              sort: { timestamp: -1 }
                              });
      }
});

Template.logboard.helpers({
  //the logs cursor
  logs() {
    //instead of using Logs.find() directly, we're callng a function named logs() set on the template instance
    //cursors are naturally reactive so logs() doesn't need to be a reactive variable, but it does need to be a function for the reactivity to kick in
    return Template.instance().logs();
  }
});

Template.logboard.events ({
  "click .load-more" (event, instance) {
    //this points to data context, so use instance as second arg of handler function
    //instance.limit --> points to a limit variable assigned to template instance
    //reactive variables --> roll out your own "session variables" while controlling their scope
    //in this case, to limit it to the current template instance,, without having to polute global namespace

      event.preventDefault();
      //get current value for limit (# of displayed logs)
      var limit = instance.limit.get();
      limit += 50;
      instance.limit.set(limit);
  },
  "click .fetch-new" (event, instance) {
    event.preventDefault();
  }
});