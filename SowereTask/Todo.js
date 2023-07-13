var app=angular.module("todoapp", []);

app.controller("todocontroller", function($scope, $timeout){

    $scope.todolist=[];
    var sounds=[
        "alarm.wav"
    ];

    $scope.currenttime=0;
    changecount=function()
    {
        var dt=new Date();
        var d=dt.getDate();
        var m=dt.getMonth()+1;
        var y=dt.getFullYear();
        var h=dt.getHours();
        var M=dt.getMinutes();

        var s=dt.getSeconds();

        var ct=y+"-"+getTwoDigit(m)+"-"+getTwoDigit(d)+" "+getTwoDigit(h)+":"+getTwoDigit(M);

        $scope.currenttime=ct;

        for(var i=0; i<$scope.todolist.length; i++) {

            if($scope.todolist[i].status==false) {

                var taskdt=$scope.todolist[i].date+" "+$scope.todolist[i].time;
                if(taskdt==ct) {
                    var audio = new Audio(sounds[0]);
                    audio.play();
                }

            }

        }
        
        $timeout( function(){
            changecount();
        }, 30000 );
    }

    getTwoDigit=function(number) {
        if(number<10) {
            return "0"+number;
        } 
        else {
            return number;
        }
    }

    changecount();

    $scope.addtask=function() {

        var task={
            text: $scope.text,
            date: $scope.date,
            time: $scope.time,
            status: false
        };
        
        if($scope.todolist.indexOf(task)>=0) {
            alert("Task Already Added");
        }
        else {
            $scope.todolist.push(task);
            $scope.text="";
            $scope.date="";
            $scope.time="";
        }

    }

    $scope.deletetask= function(task) {

        $scope.todolist.splice( $scope.todolist.indexOf(task), 1 );

    }


});