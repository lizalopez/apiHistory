import { Template } from 'meteor/templating';
//create reactive data sources and control state in our template.
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';

import { Logs } from '../imports/api/lists/lists.js';
import '../imports/api/lists/methods.js';
import '../imports/ui/logboard.js';
import '../imports/ui/logForm.js';






