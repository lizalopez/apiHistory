import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './logForm.html';
import { Logs } from '../api/lists/lists.js';
import '../api/lists/methods.js';

Template.addLogForm.events ({
  "submit .new-log" (event, tmpl) {
    event.preventDefault();
    //get values from form element
    var target = event.target;


    var newLog = {
      name: event.target.name.value,
      endpoint: event.target.endpoint.value,
      result: event.target.result.value
    };

    Meteor.call(
      "addLog",
      newLog,
      function (err, result) {
        if (err) {
          //check validation failed on server 
          if (err.reason === 'Match failed') {
            alert('Please enter format as shown in examples')
          } else {
            alert("Could not add log: " + err.reason);
          }
        }
        // target.text.value = "";
        console.log("NEW LOGS from AddLog()", result );
      }
    );
    // Logs.insert(newLog);
    event.target.name.value = "";
    event.target.endpoint.value = "";
    event.target.result.value = "";
  }
});
