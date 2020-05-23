import * as PIXI from "pixi.js";
import * as Matter from 'matter-js'

import MovieClip from "./MovieClip";
import Transform from "./Transform";
import Graphic from "./Graphic";

export default class Game {
    public mainClip: MovieClip = new MovieClip("root");

    public app: PIXI.Application;
    private isPlaying: boolean = false;

    private framesPerSecond = 60;
    private secondPerFrame = 1 / this.framesPerSecond;
    private lastTime = (new Date()).getTime();
    private timeLeft = this.secondPerFrame * 1000;
    public deltaTime = 0;

    private objects: { [id: string]: (MovieClip | Graphic); } = {};

    private engine = Matter.Engine.create();
    private bodys: { gameObject: (MovieClip | Graphic), body: Matter.Body }[] = [];
    public startCallback: (()=>void)[] = [];

    private isDestroying = false;


    constructor(width: number, height: number, target: HTMLElement, backgroundColor = 0xFFFFFF, fps = 60) {
        this.app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: backgroundColor
        });
        this.setFps(fps);
        target.appendChild(this.app.view);
        this.engine.world.gravity.y = 1;
    }

    public setFps(fps: number) {
        this.framesPerSecond = fps;
        this.secondPerFrame = 1 / fps;
    }

    public start() {
        PIXI.Loader.shared.on("complete",()=>{alert("완료")});
        this.initEvents();
        this.isPlaying = true;
        this.mainClip.update(this.app, Transform.init, true);
        this.startCallback.map(func => { func() });
        requestAnimationFrame(() => { this.animate(this) });
    }

    private animate(game: Game) {
        if(this.isDestroying){
            this.app.destroy(true);
            return;
        }
        this.deltaTime = (new Date()).getTime() - this.lastTime;
        this.updatePhysics(this.deltaTime);
        this.timeLeft -= this.deltaTime;
        if (this.timeLeft < 0 && this.isPlaying) {
            this.mainClip.update(this.app);
            this.timeLeft = this.secondPerFrame * 1000;
        }
        else {
            this.mainClip.render(this.app);
        }
        this.app.renderer.render(this.app.stage,undefined,false);
        this.lastTime = (new Date()).getTime()
        requestAnimationFrame(() => { this.animate(game) });
    }

    public destroy()
    {
        this.isDestroying = true;
    }

    public stop() {
        this.isPlaying = false;
    }

    public play() {
        this.isPlaying = true;
    }

    public addObject(name: string, object: MovieClip|Graphic) {
        this.objects[name] = object;
    }

    public getObject(name: string) {
        return this.objects[name];
    }

    public addPhysics(object: Graphic | MovieClip, isStatic: boolean, friction: number, mass: number) {
        let bound: PIXI.Rectangle;
        if (object instanceof MovieClip) {
            bound = object.getBound();
        }
        else {
            bound = object.sprite.getBounds();
        }
        const transform = object.getTransform();
        const body = Matter.Bodies.rectangle(transform.x, transform.y, bound.width, bound.height);
        body.angle = transform.roatation;
        body.friction = friction;
        body.mass = mass;
        body.isStatic = isStatic;
        Matter.World.add(this.engine.world, body);
        object.body = body;
        this.bodys.push({ body: body, gameObject: object });

    }

    private updatePhysics(deltaTime: number) {
        this.bodys.map((el) => {
            el.gameObject.setTransform(new Transform(el.body.position.x, el.body.position.y, 1, 1, el.body.angle));
        });
        Matter.Engine.update(this.engine, deltaTime, 1);
    }

    public addMouseEvent(object:PIXI.DisplayObject,type:string,callback:()=>void){   
        object.addListener(type, callback);
    }


    //mouse,keyboard events
    private keys: boolean[] = [];
    private keysDownOnce: number[] = [];
    private keysUpOnce: number[] = [];
    private mouseDown: boolean = false;

    private mouseOnceDown: number = 0;
    private mouseOnceUp: number = 0;
    private mouseOnceClick: number = 0;



    public isKeyDown(keyCode: number) {
        return this.keys[keyCode];
    }

    public isKeyPress(keyCode: number) {
        return this.keysDownOnce[keyCode] == 1;
    }

    public isKeyRelease(keyCode: number) {
        return this.keysUpOnce[keyCode] == 1;
    }

    public isMouseDown() {
        return this.mouseDown;
    }
    public isMouseOnceDown() {
        return this.mouseOnceDown == 1;
    }

    public isMouseOnceUp() {
        return this.mouseOnceUp == 1;
    }

    public isMouseOnceClick() {
        return this.mouseOnceClick == 1;
    }


    private initEvents() {

        this.app.stage.addListener("mousedown", (e) => {this.onMouseDown(e) });
        this.app.stage.addListener("mouseup", (e) => {this.onMouseUp(e) })
        this.app.stage.addListener("click", (e) => {this.onClick(e) });;
        window.addEventListener("keydown", (e) => { this.keyDown(e) });
        window.addEventListener("keyup", (e) => { this.keyUp(e) });

        this.keys[4] = true;



        this.app.ticker.add(() => { this.eventTick() })
    }

    private eventTick() {
        this.keysDownOnce.map((key, i) => {
            if (key != 0) {
                this.keysDownOnce[i]--;
            }
            else {
                this.keysDownOnce = this.keysDownOnce.slice(i, i);
            }
        });
        this.keysUpOnce.map((key, i) => {
            if (key != 0) {
                this.keysUpOnce[i]--;
            }
            else {
                this.keysUpOnce = this.keysUpOnce.slice(i, i);
            }
        });

        if (this.mouseOnceDown != 0) {
            this.mouseOnceDown--;
        }
        if (this.mouseOnceUp != 0) {
            this.mouseOnceUp--;
        }
        if (this.mouseOnceClick != 0) {
            this.mouseOnceClick--;
        }

    }

    private onMouseDown(e: PIXI.interaction.InteractionEvent) {
        this.mouseDown = true;
        this.mouseOnceDown = 2;
    }

    private onMouseUp(e: PIXI.interaction.InteractionEvent) {
        this.mouseDown = false;
        this.mouseOnceUp = 2;
    }

    private onClick(e: PIXI.interaction.InteractionEvent) {
        this.mouseOnceClick = 2;
    }

    private keyDown(e: KeyboardEvent) {
        this.keysDownOnce[e.keyCode] = (!e.repeat ? 2 : -1);
        this.keys[e.keyCode] = true;
    }
    private keyUp(e: KeyboardEvent) {
        this.keysUpOnce[e.keyCode] = (!e.repeat ? 2 : -1);
        this.keys[e.keyCode] = false;
    }
}