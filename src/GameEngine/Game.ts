import * as PIXI from "pixi.js";
import * as Matter from 'matter-js'

import MovieClip from "./MovieClip";
import Transform from "./Transform";
import Graphic from "./Graphic";

export default class Game {
    public mainClip: MovieClip = new MovieClip();

    private app: PIXI.Application;
    private isPlaying: boolean = false;

    private framesPerSecond = 60;
    private secondPerFrame = 1 / this.framesPerSecond;
    private lastTime = (new Date()).getTime();
    private timeLeft = this.secondPerFrame * 1000;
    public deltaTime = 0;

    private objects:{ [id: string] : (MovieClip|Graphic); } = {};

    private engine = Matter.Engine.create();
    private bodys:{gameObject:(MovieClip|Graphic),body:Matter.Body}[] = [];
    
    

    constructor(width:number,height:number,target:HTMLElement,backgroundColor = 0x000000,fps = 60) {
        this.app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor:backgroundColor
          });
          this.setFps(fps);
          target.appendChild(this.app.view);
          this.engine.world.gravity.y=0;
    }

    public setFps(fps:number)
    {
        this.framesPerSecond = fps;
        this.secondPerFrame = 1/fps;
    }

    public start() {
        this.isPlaying = true;
        this.mainClip.update(this.app, Transform.init, true);
        requestAnimationFrame(()=>{this.animate(this)});
    }

    private animate(game:Game) {
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
        this.lastTime = (new Date()).getTime()
        requestAnimationFrame(()=>{this.animate(game)});
    }

    public stop() {
        this.isPlaying = false;
    }

    public play() {
        this.isPlaying = true;
    }

    public createMovieClip(name:string,movieClip:MovieClip)
    {
        this.objects[name] = movieClip;
    }

    public getMovieClip(name:string)
    {
        return this.objects[name];
    }

    public addPhysics(object:Graphic|MovieClip,isStatic:boolean,friction:number,mass:number)
    {
        let bound:PIXI.Rectangle;
        if(object instanceof MovieClip)
        {
            bound = object.getBound();
        }
        else
        {
            bound = object.sprite.getBounds();
        }
        const transform = object.getTransform();
        const body = Matter.Bodies.rectangle(transform.x,transform.y,bound.width,bound.height);
        body.angle = transform.roatation;
        body.friction = friction;
        body.mass = mass;
        Matter.World.add(this.engine.world,body);
        object.body = body;
        this.bodys.push({body:body,gameObject:object});
    }

    private updatePhysics(deltaTime:number)
    {
        this.bodys.map((el)=>{
            el.gameObject.setTransform(new Transform(el.body.position.x,el.body.position.y,1,1,el.body.angle));
        });
        Matter.Engine.update(this.engine,deltaTime,1);
    }
}