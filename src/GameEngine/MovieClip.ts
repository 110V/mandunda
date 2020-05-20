import * as PIXI from "pixi.js";

import Frame from "./Frame";
import Transform from "./Transform";
import Graphic from "./Graphic";



export default class MovieClip {
  //객체 정보
  private transform: Transform;
  private childs: (MovieClip|Graphic)[] = []
  private parent?: MovieClip;
  //프레임
  private frames: Frame[] = []; //프레임은 1부터 시작
  public currentFrame: number = 1;
  public isPlaying: boolean = true;

  public body:Matter.Body|null = null; 

  constructor(transform = Transform.init) {
    this.transform = transform;
    this.addFrame();
  }

  public setTransform(transform:Transform)
  {
      this.transform = transform;
  }

  public getTransform()
  {
    return this.transform;
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
    container.setTransform(this.transform.x,this.transform.y,this.transform.scaleX,this.transform.scaleY,this.transform.roatation);
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
}