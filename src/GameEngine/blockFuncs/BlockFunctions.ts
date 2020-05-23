import Game from "../Game";
import MovieClip from "../MovieClip";
import Graphic from "../Graphic";
import Matter from "matter-js";


let BlockFunctions: { [id: string]: (Function); } = {};

BlockFunctions["addForce"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {
    if (object.body) {
        //Matter.Body.setVelocity(object.body, { x: object.body.velocity.x + x, y: object.body.velocity.y + y })
        Matter.Body.applyForce(object.body,object.body.position,{x:x,y:y});
    }
}

BlockFunctions["addPhysics"] = (game: Game, object: (MovieClip | Graphic), friction: number, mass: number, isStatic: boolean) => {
    game.addPhysics(object, isStatic, friction, mass);
}

BlockFunctions["checkCollision"] = (game: Game, a: (MovieClip | Graphic), b: (MovieClip | Graphic)) => {
    if(a.body&&b.body){
        return Matter.Query.collides(a.body,[b.body]).length != 0;
    }
}

BlockFunctions["gameStart"] = (game: Game, blocks: () => {}) => {
    game.startCallback.push(blocks);
}

BlockFunctions["gameTick"] = (game: Game, blocks: () => {}) => {
    game.app.ticker.add(blocks);
}

BlockFunctions["getKeyboardEvent"] = (game: Game, eventType: string, keyCode: number) => {
    switch(eventType)
    {
        case "isDown":
            return game.isKeyPress(keyCode);
        case "isUp":
            return game.isKeyRelease(keyCode);
    }
}

BlockFunctions["getKeyboardState"] = (game: Game, stateType: string, keyCode: number) => {
    const keyDown =  game.isKeyDown(keyCode);
    switch(stateType)
    {
        case "isDown":
            return keyDown;
        case "isUp":
            return !keyDown;
    }
}

BlockFunctions["getMouseEvent"] = (game: Game, eventType: string) => {
    switch(eventType)
    {
        case "isDown":
            return game.isMouseOnceDown();
        case "isUp":
            return game.isMouseOnceUp();
        case "isClick":
            return game.isMouseOnceClick();
    }
}

BlockFunctions["getMouseState"] = (game: Game, stateType: string) => {
    const keyDown =  game.isMouseDown();
    switch(stateType)
    {
        case "isDown":
            return keyDown;
        case "isUp":
            return !keyDown;
    }
}

BlockFunctions["getObject"] = (game: Game, objectName: string) => {
    return game.getObject(objectName);
}

BlockFunctions["getPos"] = (game: Game, type: string, object: (MovieClip | Graphic)) => {
    switch(type)
    {
        case "x":
            return object.getTransform().x;
        case "y":
            return object.getTransform().y;
    }
}

BlockFunctions["getVelocity"] = (game: Game, type: string, object: (MovieClip | Graphic)) => {
    if(!object.body)
        return;

    switch(type)
    {
        case "x":
            return object.body.velocity.x;
        case "y":
            return object.body.velocity.y;
    }
}

BlockFunctions["mouseEvent"] = (game: Game, object: (MovieClip | Graphic), type: string, blocks: (()=>void)) => {
    if(object instanceof MovieClip)
    {
        console.log("무비클립은 마우스 이벤트를 지원하지 않습니다.");
        return;
    }
    game.addMouseEvent(object.sprite,type,blocks);
}

BlockFunctions["setPos"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {
    if(object.body){
        Matter.Body.setPosition(object.body,{x:x,y:y});
    }
    const transform = object.getTransform();
    transform.x = x;
    transform.y = y;
    object.setTransform(transform);
}

BlockFunctions["setVelocity"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {
    if(object.body){
        Matter.Body.setVelocity(object.body,{x:x,y:y});
    }
}

BlockFunctions["setRotation"] = (game: Game, object: (MovieClip | Graphic), angle:number) => {
    if(object.body){
        Matter.Body.setAngle(object.body,angle);
    }
    const transform = object.getTransform();
    transform.roatation = angle;
    object.setTransform(transform);
}

export default BlockFunctions;