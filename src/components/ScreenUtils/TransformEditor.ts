import * as PIXI from 'pixi.js';

export default class TransformEditor {
    private app: PIXI.Application;
    private container = new PIXI.Container();

    private border = new PIXI.Graphics();
    private points: PIXI.Graphics[] = [];
    private style: { color: number, thickness: number, radius: number };

    public transformChanged:((index:number,transform:PIXI.Transform)=>void) = ()=>{};
    public selectedTargetChanged:((index:number|undefined)=>void) = ()=>{};

    constructor(app: PIXI.Application, style: { color: number, thickness: number, radius: number }) {
        this.app = app;
        this.style = style;

        app.ticker.add(this.tick);
        this.init();
    }

    private tick() {
        // alert("hello");
        // if(!this.app)
        //     return;
        // this.app.renderer.render(this.container, undefined, false);
        // this.container.destroy();
        // this.container = new PIXI.Container();
    }

    private init() {
        for (let i = 0; i < 10; i++) {
            const point = new PIXI.Graphics();
            point.beginFill(this.style.color);
            point.drawCircle(0, 0, this.style.radius);

            point.addListener("mousedown", () => { this.pointMouseDown(i) });
            this.points.push(point);
        }

        this.app.stage.addListener("mouseup", ()=>{this.mouseUp()});
        this.app.stage.addListener("mousemove", (e) => { this.mouseMove(e.data.global.x, e.data.global.y) });
    }

    //Points
    //    8
    //0   1   2
    //3   9   4
    //5   6   7
    private state:State = State.none;

    private objects: PIXI.DisplayObject[] = [];
    private targetIndex:number|undefined;

    public setObjects(objects:PIXI.DisplayObject[])
    {
        this.objects = objects;
        for(let i = 0;i < objects.length;i++)
        {
            objects[i].removeAllListeners();
            objects[i].addListener("mousedown",()=>{this.targetMouseDown(i)});
            objects[i].interactive = true;
        }
        this.state = State.none;
        if(objects.length!=0)
            this.setTarget(this.targetIndex = objects.length-1)
        else this.removeTarget();
    }

    public setTarget(targetIndex:number) {
        this.targetIndex = targetIndex;
        this.selectedTargetChanged(this.targetIndex);
    }

    public removeTarget() {
        this.targetIndex = undefined;
        this.selectedTargetChanged(undefined);
    }

    //events
    private pointMouseDown(num: number) {
        
    }

    private targetMouseDown(index:number) {
        console.log(index+"가눌림");
        this.setTarget(index);
        this.state = State.moving;
    }

    private mouseUp() {
        if(this.targetIndex == undefined)
            return;

        if(this.state == State.moving)
        {
            const index = this.targetIndex;
            this.transformChanged(index,this.objects[index].transform);
            this.state = State.none;
        }
    }

    private prevMouseX: number = 0;
    private prevMouseY: number = 0;

    private mouseMove(x: number, y: number) {
        const deltaMouseX = x - this.prevMouseX;
        const deltaMouseY = y - this.prevMouseY;
        this.prevMouseX = x;
        this.prevMouseY = y;

        if(this.targetIndex == undefined)
            return;
        const target = this.objects[this.targetIndex];

        if (this.state == State.moving) {
            target.transform.position.x += deltaMouseX;
            target.transform.position.y += deltaMouseY;
        }
    }
    //calcs
}


enum State{
    none,
    moving,
}