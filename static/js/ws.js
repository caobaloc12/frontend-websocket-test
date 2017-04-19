(function() {
  'use strict';

  angular.module('app')
         .factory('ws', webSocket);

  function webSocket($websocket, $rootScope) {
      var dataStream = $websocket('ws://127.0.0.1:8080/ws');
      var collection = [];

      dataStream.onOpen(function() {
        console.log("Socket is open");
      });

      dataStream.onMessage(function(msg) {
        $rootScope.$broadcast("new update", JSON.parse(msg.data));
      });


      dataStream.onClose(function () {
          console.log("Socket closed!");
      });

      return {
        collection: collection
      };
  }

})();
