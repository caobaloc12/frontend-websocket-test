# Create a front-end presentation for a given websocket stream

## HOWTO 

Using Bootstrap 4 and Angular JS to build the view
Inject the [angular-websocket](https://www.npmjs.com/package/angular-websocket) module

```javascript
angular.module('app', ['ngWebSocket'])

```

Creating the `MyData` factory that create and open the WebSocket instance

```javascript
angular.module('app', ['ngWebSocket'])
.factory('MyData', function($websocket){
  var dataStream = $websocket('ws://127.0.0.1:8080/ws');      
})
```

Using the `onMessage` method to listen and receive every message from the websocket 
and create  a `collection` object to store received message

```javascript
var collection = {};

dataStream.onMessage(function(message) {
  var data = JSON.parse(message.data);
  collection.services = data["services"];
  collection.serviceMap =  data["service-map"];
});
```

Using other method such as `onOpen`, `onClose`, `onError` to execute the websocket connection is open, closed or error happening then show message on the view

Finally binding data from controller to the view: 
```html
<!-- inside table -->
<tbody>
  <tr ng-repeat="data in MyData.collection.services track by $index">
    <td>{{$index + 1}}</td>
    <td>{{data.service}}</td>
    <td><span class="badge " ng-class="{'badge-success': data.status == 'OK','badge-danger':data.status !== 'OK'}">{{data.status}}</span></td>
    <td><span class="badge " ng-class="{'badge-success': data.db_is_ok == true,'badge-danger':data.db_is_ok == false}">{{data.db_is_ok? 'Connected': 'Disconnected'}}</span></td>
    <td><span class="badge " ng-class="{'badge-success': data.cache_is_ok == true,'badge-danger':data.cache_is_ok == false}">{{data.cache_is_ok? 'Enabled': 'Disabled'}}</span></td>
    <td><span class="badge " ng-class="{'badge-success': data.struct_cache_is_ok == true,'badge-danger':data.struct_cache_is_ok == false}">{{data.struct_cache_is_ok? 'Enabled': 'Disabled'}}</span></td>
    <td>{{data.version}}</td>
  </tr>
</tbody>

```
