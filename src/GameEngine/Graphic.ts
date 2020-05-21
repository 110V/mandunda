import * as PIXI from "pixi.js";
import Transform from "./Transform";
import MovieClip from "./MovieClip";

export default class Graphic {

    public sprite:PIXI.Sprite;

    private transform:Transform;
    public width?:number;
    public height?:number;

    private parent?:MovieClip;
    public data:PIXI.Texture;
    
    public body:Matter.Body|null = null; 

    public getParent()
    {
        return this.parent;
    }
    
    public setParent(parent:MovieClip)
    {
        this.parent = parent;
    }

    public setTransform(transform:Transform)
    {
        this.transform = transform;
        this.sprite.setTransform(transform.x,transform.y,transform.scaleX,transform.scaleY,transform.roatation);
    }

    public getTransform()
    {
        return this.transform.clone();
    }

    constructor(transform:Transform,data:PIXI.Texture,width?:number,height?:number){
        this.data = data;
        this.transform = transform;
        this.sprite = PIXI.Sprite.from(data);

        if(width)
            this.width = width;
        if(height)
            this.height = height;
    }

    public update(app: PIXI.Application, transform: Transform = Transform.init) {
        const newTransform = transform.calcChildTransform(this.transform);
        this.sprite.transform.position.set(newTransform.x,newTransform.y);
        this.sprite.transform.rotation = newTransform.roatation;
        this.sprite.scale.set(newTransform.scaleX,newTransform.scaleY);
        if(this.width)
            this.sprite.width = this.width;
        if(this.height)
            this.sprite.height = this.height;
        app.renderer.render(this.sprite,undefined,false);
    }

    public render(app: PIXI.Application)
    {
        app.renderer.render(this.sprite,undefined,false);
    }
}