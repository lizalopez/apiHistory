import { Meteor } from 'meteor/meteor';
import { Logs } from './lists.js';
import { check } from 'meteor/check';

const MAX_LOGS = 500000;

if (Meteor.isServer) {
  Meteor.publish('logs', function (limit) {   
    Meteor._sleepForMs(500);
    return Logs.find({}, {sort: { timestamp: -1 }, 
                          limit: Math.min(limit, MAX_LOGS)
                          // skip: skip could be used to get the next 50 only and not with the previous items
    });
    return this.ready();
  });
}

Meteor.methods ({
  'seedDatabase' () {
    //seed database if empty
    var endPointHash1 = {
      0: '/clients',
      1: '/companies',
      2: '/admins',
      3: '/tokens',
      4: '/users'
    };

    var endPointHash2 = {
      0: '/id',
      1: '/contacts',
      2: '/events'
    };

    var resultHash = {
      0: "Success",
      1: "Error"
    }; 
    //seed DB
    if (Logs.find().count() === 0) {
      console.log("Seeding database...", Logs.find().count());
      for (var i = 1; i < 1001; i++) {
        Logs.insert( {
          name: "Client"+i,
          timestamp: new Date(),
          endpoint: endPointHash1[Math.floor(Math.random() * 5)] + endPointHash2[Math.floor(Math.random() * 3)],
          result: resultHash[Math.floor(Math.random() * 2)]
        })
      }
      console.log("Database seeded", Logs.find().count());   
    } else {
      console.log("Database already seeded", Logs.find().count());
    }

  },
  // addLog is called from both client and server
  // this fn performs form validation and inserts the new movie into the collection
  // when called on the client, it updates the collection rendered
  // when called on the server, updates the db with the new entry
  'addLog'(log) {
    //perform form validation
    check(log, {
      name: String,
      result: String,
      endpoint: String,
    })
    log.timestamp = new Date();

    if (Meteor.isClient) {
      console.log("add log called client");
    }
    if (log.name === "") {
      throw new Meteor.Error(413, "Missing name");
    }
    if (log.endpoint === "") {
      throw new Meteor.Error(413, "Missing endpoint");
    }
    if (Meteor.isServer) {
      console.log("INSERTING LOGG server");
    }
    //insert log: simulate on client, implement on server
    var addedLog = Logs.insert(log);

    return addedLog;
  }
})
