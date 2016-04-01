import { Mongo } from 'meteor/mongo';

const Logs = new Mongo.Collection('logs');

export { Logs };