
function newDot(x, y){
    obj = {}
    obj.x = x;
    obj.y = y;
    obj.xvel = 0;
    obj.yvel = 0;

    obj.updatePositon = function(){
        obj.x += obj.xvel;
        obj.y += obj.yvel;
    };

    obj.updateVelocity = function(dx, dy){
        obj.xvel += dx;
        obj.yvel += dy;
    };
    
    obj.constrain = function(width, height){
        if(obj.x > width){obj.x = width;}
        else if(obj.x < 0){obj.x = 0;}
        else if(obj.y > height){obj.y = height;}
        else if(obj.y < 0){obj.y = 0;}
    };

    obj.step = function(){
        obj.updatePositon();
        obj.updateVelocity();
        obj.constrain();
    };

    obj.location = function(){
        return([Math.round(obj.x), Math.round(obj.y)]);
    };

    obj.getDistance = function(other){
        var dx = Math.abs(obj.x - other.x);
        var dy = Math.abs(obj.y - other.y);

        return(Math.sqrt((dx**2) + (dy**2))); // pythagorean theorem :)
    };

    obj.repel = function(other, scaling = 1/100){
        var distance = obj.getDistance(other);
        var dx = obj.x - other.x;
        var dy = obj.y - other.y;

        obj.xvel -= dx * scaling;
        obj.yvel -= dy * scaling;
        other.xvel += dx * scaling; // this is the opposite of the previous one because we want points to go in opposite directions
        other.yvel += dy * scaling;
    };

    obj.attract = function(other, scaling = 1/100){
        var distance = obj.getDistance(other);
        var dx = obj.x - other.x;
        var dy = obj.y - other.y;

        obj.xvel += dx * scaling;
        obj.yvel += dy * scaling;
        other.xvel -= dx * scaling; // this is the opposite of the previous one because we want points to go in opposite directions
        other.yvel -= dy * scaling;
    };

}