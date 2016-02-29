/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoWatch: true,
  attributes: {
    source: { type: 'int' },
    channelId : { type: 'string' },
    userId : { type: 'string' },
    name : { type: 'string' },
    avatar : { type: 'string' },    
    content : { type: 'string' },
    type: {type: 'int' },
    extend: {type: 'string'}
  }
};

