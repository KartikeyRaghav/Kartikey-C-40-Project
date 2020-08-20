class Road {
    constructor(x) {
        this.road = createSprite(x,height/2,650,height);
        this.road.shapeColor = '#333333';
    }

    linee() {
        stroke("black");
        strokeWeight(10);
        line(this.road.x + 325,0,this.road.x + 325,height);
        line(this.road.x - 325,0,this.road.x - 325,height);
    }
}