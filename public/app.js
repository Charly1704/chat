chatApp=angular.module("FrankenChat",[]);
chatApp.controller("chatCtrl",function($scope,$http){
    
    
    $scope.socket = io.connect("https://proyecto-carlossn.c9users.io:8080/",{'forceNew':true});
    $scope.mensajes=[];
    $scope.object = new Object();
    $scope.guardarMensaje = function(){
     $http.post("https://proyecto-carlossn.c9users.io/api/guardar",$scope.object).success(function(data){
         //$scope.mensajes.push(data.mensaje);
         $scope.socket.emit("mensajeNuevo", $scope.object.mensaje)
     })
    }
        $scope.socket.on('enviarMensajes',function(data){
        $scope.mensajes=data;
        console.log($scope.mensajes);
        $scope.$apply();
    })
});
