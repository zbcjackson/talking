/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  listen:function(req, res){
    ChatMessage.watch(req)
    res.ok()
  }
};