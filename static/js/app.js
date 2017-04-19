angular.module('app', ['ngWebSocket'])

.factory('MyData', function($websocket) {

  var dataStream = $websocket('ws://127.0.0.1:8080/ws');

  var collection = {};

  dataStream.onMessage(function(message) {
    var data = JSON.parse(message.data);
    collection.services = data["services"];
    collection.serviceMap =  data["service-map"];
  });

  dataStream.onOpen(function () {
    collection.message = "Socket is open";
    collection.status = true;
  });

  dataStream.onClose(function () {
    collection.message = "Socket closed";
    collection.status = false;
  });

  dataStream.onError(function (e) {
    collection.message = "Connection Error" + e;
    collection.status = false;
  });

  return {
    collection: collection    
  };

})
.controller('MainController', function ($scope, MyData) {
  $scope.MyData = MyData;
});
