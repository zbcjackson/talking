/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  listen:function(req, res){
    ChatMessage.watch(req)
    if(req.isSocket)
    {
      res.ok()
    }
    else{
      res.end()
    }
  }
};