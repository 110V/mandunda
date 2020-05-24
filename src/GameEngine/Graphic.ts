import * as PIXI from "pixi.js";
import Transform from "./Transform";
import MovieClip from "./MovieClip";
import ResourceManager from "./ResourceManager";

export default class Graphic {

    public name:string;
    public sprite:PIXI.Sprite;

    private transform:Transform;
    public width?:number;
    public height?:number;

    private parent?:MovieClip;
    public texId:string;
    
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
        this.sprite.setTransform(transform.x,transform.y,transform.scaleX,transform.scaleY,transform.rotation);
    }

    public getTransform()
    {
        return this.transform.clone();
    }

    constructor(name:string,transform:Transform,resourceManager:ResourceManager,texId:string,width?:number,height?:number){
        this.name = name;
        this.texId = texId;
        this.transform = transform;
        this.sprite = PIXI.Sprite.from(resourceManager.getTexture(texId));

        if(width)
            this.width = width;
        if(height)
            this.height = height;
        
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }

    public update(app: PIXI.Application, transform: Transform = Transform.init) {
        const newTransform = transform.calcChildTransform(this.transform);
        this.sprite.transform.position.set(newTransform.x,newTransform.y);
        this.sprite.transform.rotation = newTransform.rotation;
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

    public exportMaker()
    {
      return {type:"Graphic",name:this.name,transform:this.transform,texture:this.texId,width:this.width,height:this.height};
    }
}