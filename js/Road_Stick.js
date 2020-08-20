class Road_Stick {
    constructor(x,y){
        this.road_stick = createSprite(x,y,20,100);
        this.road_stick.shapeColor = "white";
        road_sticks.push(this.road_stick);
    }
}