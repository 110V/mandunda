import * as PIXI from "pixi.js";

import Frame from "./Frame";
import Transform from "./Transform";
import Graphic from "./Graphic";
import Game from "./Game";
import ResourceManager from "./ResourceManager";



export default class MovieClip {
  //객체 정보
  public name:string;
  private transform: Transform;
  private childs: (MovieClip|Graphic)[] = []
  private parent?: MovieClip;
  //프레임
  private frames: Frame[] = []; //프레임은 1부터 시작
  public currentFrame: number = 1;
  public isPlaying: boolean = true;

  public body:Matter.Body|null = null; 

  constructor(name:string,transform = Transform.init) {
    this.name = name;
    this.transform = transform;
    this.addFrame();
  }

  public setTransform(transform:Transform)
  {
      this.transform = transform;
  }

  public getTransform()
  {
    return this.transform.clone();
  }


  public play() {
    this.isPlaying = true;
  }

  public stop() {
    this.isPlaying = false;
  }

  public gotoAndStop(frame: number) {
    this.currentFrame = frame;
    this.stop();
  }

  public gotoAndPlay(frame: number) {
    this.currentFrame = frame;
    this.play();
  }

  public getFrameCount() {
    return this.frames.length;
  }

  public addFrame() {
    this.frames.push(new Frame());
    return this.getFrameCount();
  }

  public extendFramesTo(frame: number) {
    const targetCount = frame - this.getFrameCount();
    for (let i = 0; i < targetCount; i++) {
      this.addFrame();
    }
  }

  public getFrame(frame: number) {
    return this.frames[frame-1];
  }

  public getCurrentFrame() {
    return this.getFrame(this.currentFrame);
  }

  public addObject(Object: MovieClip | Graphic, frames: number[], transforms: Transform[]) {
    frames.forEach((frame,i) => {
      this.extendFramesTo(frame);
      this.getFrame(frame).addObject(Object,transforms[i]);
      this.childs.push(Object);
      Object.setParent(this);
    });
  }

  public removeObject(object: MovieClip|Graphic,frameNum:number)
  {
    const frame = this.getFrame(frameNum);
    frame.removeObject(object);
    this.childs.map((el,i)=>{
      if(el==object){
          this.childs.splice(i,1);
      }
  })
  }

  public getChild(num:number)
  {
    return this.childs[num];
  }

  public getParent()
  {
      return this.parent;
  }
  
  public setParent(parent:MovieClip)
  {
      this.parent = parent;
  }

  public update(app: PIXI.Application, transform: Transform = Transform.init,init:boolean = false) {
    //프레임 재생 처리
    if(this.getFrameCount()<=1)
    {
      this.isPlaying = false;
    }

    if(this.isPlaying)
    {
      if(this.currentFrame == this.getFrameCount())
      {
        this.currentFrame=1;
      }
      else{
        this.currentFrame+=1;
      }
    }
    //그리기 처리
    this.getCurrentFrame().update(app, transform.calcChildTransform(this.transform),this.isPlaying||init);
  }

  public render(app: PIXI.Application)
  {
    this.getCurrentFrame().render(app);
  }

  public makeContainer(frame:number)
  {
    const container = this.getFrame(frame).makeContainer();
    container.setTransform(this.transform.x,this.transform.y,this.transform.scaleX,this.transform.scaleY,this.transform.rotation);
    return container;
  }

  public getBound()
  {
    const container = this.makeContainer(1);
    container.angle = 0;
    const bound = this.makeContainer(1).getBounds();
    container.destroy();
    return bound;
  }

  public exportStruct(transform:Transform)
  {
    let frames:any = [];
    this.frames.map((frame)=>{
      frames.push(frame.exportStruct());
    }) 
    let struct = {type:"MovieClip",name:this.name,
                 transform:transform,
                 frames:frames,
                 maker:this.exportMaker()}
    return struct;
  }

  public exportMaker()
  {
    //makers = [];
    //makers.push({type:"MovieClip",name:this.name,transform:this.transform});
    // this.childs.map((child)=>{
    //   makers.push(child.exportMaker())
    // })
    return {type:"MovieClip",name:this.name,transform:this.transform};
  }

  public exportJson()
  {
    return JSON.stringify(this.exportStruct(new Transform(0,0)));
  }

  static importJson(json:string,rm:ResourceManager,game:Game|undefined = undefined)
  {
    const struct  = JSON.parse(json);
    const clip = this.make(struct.maker,rm,game);
    clip.importStruct(struct,rm,game);
    return clip;
  }

  public importStruct(struct:any,rm:ResourceManager,game:Game|undefined = undefined)
  {
    struct.frames.map((batches:any,i:number)=>{
      batches.map((batch:any)=>{
        const object = MovieClip.make(batch.maker,rm,game);
        this.addObject(object,[i+1],[Transform.fromObject(batch.transform)]);
        if(object instanceof MovieClip)
        {
          object.importStruct(batch,rm,game);
        }
      });
    });
  }

  static make(maker:any,resourceManager:ResourceManager,game:Game|undefined = undefined)
  {
    let object:any;
    const transform = Transform.fromObject(maker.transform);
    if(maker.type == "MovieClip"){
      object = new MovieClip(maker.name,transform);
    }
    else { //Graphic
      object = new Graphic(maker.name,transform,resourceManager,maker.texture,maker.width,maker.height);
    }
    if(game){
      game.addObject(maker.name, object);
    }
    return object;
  }
}