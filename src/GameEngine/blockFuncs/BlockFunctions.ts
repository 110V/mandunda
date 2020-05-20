import Game from "../Game";
import MovieClip from "../MovieClip";
import Graphic from "../Graphic";
import Matter from "matter-js";


let BlockFunctions :{ [id: string] : (Function); } = {};

BlockFunctions["addForce"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {
    if (object.body) {
        Matter.Body.setVelocity(object.body, { x: object.body.velocity.x + x, y: object.body.velocity.y + y })
        //Matter.Body.applyForce(object.body,object.body.position,{x:x,y:y});
    }
}

BlockFunctions["addPhysics"] = (game: Game, object: (MovieClip | Graphic), friction: number, mass: number) => {

}

BlockFunctions["checkCollision"] = (game: Game, object: (MovieClip | Graphic), b: (MovieClip | Graphic)) => {

}

BlockFunctions["gameStart"] = (game: Game, blocks: Function) => {

}

BlockFunctions["gameTick"] = (game: Game, blocks: Function) => {

}

BlockFunctions["getKeyboardEvent"] = (game: Game, eventType: string, keyCode:number) => {

}

BlockFunctions["getKeyboardState"] = (game: Game, stateType: string, keyCode:number) => {

}

BlockFunctions["getMouseEvent"] = (game: Game, eventType: string) => {

}

BlockFunctions["getMouseState"] = (game: Game, stateType: string) => {

}

BlockFunctions["getObject"] = (game: Game, objectName: string) => {

}

BlockFunctions["getPos"] = (game: Game, type: string, object:(MovieClip | Graphic)) => {

}

BlockFunctions["getVelocity"] = (game: Game, type: string, object:(MovieClip | Graphic)) => {

}

BlockFunctions["mouseEvent"] = (game: Game, object: (MovieClip | Graphic), type: string, blocks: Function) => {

}

BlockFunctions["setPos"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {

}

BlockFunctions["setVelocity"] = (game: Game, object: (MovieClip | Graphic), x: number, y: number) => {

}




export default BlockFunctions;