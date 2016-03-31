imports/

  api/
    lists/                     # a unit of domain logic
      lists.js                 # definition of the Posts collection
      lists.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to posts
      methods.tests.js         # tests for those methods

  ui/
    logboard.html/             # entry points for rendering table of logs
    logboard.js/               # component for table behaviour and visuals
    logForm.html/              # entry points for rendering form
    logForm.js/                # component for form behaviour and visuals
    
client/
  main.js                      # client entry point, imports all client code
  main.html                    # styling

server/
  main.js                      # server entry point, imports all server code