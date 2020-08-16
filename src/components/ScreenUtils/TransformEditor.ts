import * as PIXI from 'pixi.js';
import FrontUI from './FrontUI';

export default class TransformEditor {
    private app: PIXI.Application;
    private container = new PIXI.Container();

    private frontUI: FrontUI;
    private border = new PIXI.Graphics();
    private points: PIXI.Graphics[] = [];
    private style: { color: number, thickness: number, radius: number };

    public transformChanged: ((index: number, transform: PIXI.Transform) => void) = () => { };
    public selectedTargetChanged: ((index: number | undefined) => void) = () => { };
    public selectedTargetMoving: (x: number, y: number) => void = () => { };

    constructor(app: PIXI.Application, style: { color: number, thickness: number, radius: number }) {
        this.app = app;
        this.style = style;

        app.ticker.add(() => { this.tick() });
        this.init();
        this.frontUI = new FrontUI(app);
    }

    private tick() {
        this.frontUI.update();
        if (this.targetIndex == undefined)
        {
            this.setVisiblePoints(false);
            return;
        }
            
        const target = this.objects[this.targetIndex];
        const bound = target.getBounds();
        this.frontUI.drawRect(5, 0x66CC00, 1, bound.x - 2.5, bound.y - 2.5, bound.width + 5, bound.height + 5, 0);
    }

    private init() {
        for (let i = 0; i < 10; i++) {
            const point = new PIXI.Graphics();
            point.beginFill(this.style.color);
            point.drawCircle(0, 0, this.style.radius);
            this.app.stage.addChild(point);
            point.addListener("mousedown", () => { this.pointMouseDown(i) });
            point.addListener("mouseover", () => { this.pointMouseOver(i) });
            point.addListener("mouseout", () => { this.pointMouseOut(i) });
            point.visible = false;
            point.interactive = true;
            this.points.push(point);
            point.zIndex = 1000;
            this.app.stage.sortChildren();
        }
        document.addEventListener("keydown",(e)=>{if(e.keyCode == 27){this.removeTarget()}});
        this.app.stage.addListener("mouseup", () => { this.mouseUp() });
        this.app.stage.addListener("mousemove", (e) => { this.mouseMove(e.data.global.x, e.data.global.y) });
    }

    //Points
    //    8
    //0   1   2
    //3   9   4
    //5   6   7
    private state: State = State.none;

    private currentPoint: number = -1;
    private oppositePoint: number = -1;
    private transX: boolean = false;
    private transY: boolean = false;
    private reposX: boolean = false;
    private reposY: boolean = false;

    private objects: PIXI.DisplayObject[] = [];
    private targetIndex: number | undefined;

    private setVisiblePoints(visible: boolean) {
        this.points.forEach((point) => {
            point.visible = visible;
        })
    }
    private updatePoints(exeptNum:number) {
        if (this.targetIndex == undefined) {
            this.setVisiblePoints(false);
            return;
        }
        this.setVisiblePoints(true);

        const target = this.objects[this.targetIndex];
        const boundPoints = target.getBounds();
        const xMiddle = (boundPoints.left + boundPoints.right) / 2;
        const yMiddle = (boundPoints.top + boundPoints.bottom) / 2;
        let temp:any;
        if(exeptNum!=-1){
            temp = this.points[exeptNum].position;
        }
        this.points[0].position.set(boundPoints.left, boundPoints.top);
        this.points[1].position.set(xMiddle, boundPoints.top);
        this.points[2].position.set(boundPoints.right, boundPoints.top);
        this.points[3].position.set(boundPoints.left, yMiddle);
        this.points[4].position.set(boundPoints.right, yMiddle);
        this.points[5].position.set(boundPoints.left, boundPoints.bottom);
        this.points[6].position.set(xMiddle, boundPoints.bottom);
        this.points[7].position.set(boundPoints.right, boundPoints.bottom);
        this.points[8].position.set();
        this.points[9].position.set();

        if(exeptNum!=-1){
            this.points[exeptNum].position = temp;
        }
    }

    public setObjects(objects: PIXI.DisplayObject[]) {
        this.objects = objects;
        for (let i = 0; i < objects.length; i++) {
            objects[i].removeAllListeners();
            objects[i].addListener("mousedown", () => { this.targetMouseDown(i) });
            objects[i].addListener("mouseover", () => { this.mouseOver(objects[i]) });
            objects[i].addListener("mouseout", () => { this.mouseOut(objects[i]) });
            objects[i].interactive = true;
        }
        this.state = State.none;
        if (objects.length != 0)
            this.setTarget(this.targetIndex = objects.length - 1)
        else this.removeTarget();
    }

    public setTarget(targetIndex: number) {
        this.targetIndex = targetIndex;
        this.selectedTargetChanged(this.targetIndex);
    }

    public removeTarget() {
        this.targetIndex = undefined;
        this.selectedTargetChanged(undefined);
    }

    public mouseOver(target: PIXI.DisplayObject) {
        if (this.state == State.moving)
            return;
        target.alpha = 0.7;
    }

    public mouseOut(target: PIXI.DisplayObject) {
        if (this.state == State.moving)
            return;
        target.alpha = 1;
    }

    public mouseDown() {
        console.log('asdasd')
        this.removeTarget();
    }

    //events
    private pointMouseOver(num: number)
    {
        console.log(num);
        this.points[num].alpha = 0.7;
    }
    private pointMouseOut(num: number)
    {
        this.points[num].alpha = 1;
    }
    private pointMouseDown(num: number) {
        console.log(num);
        if (num <= 7) {
            this.transX = false;
            this.transY = false;

            if(num == 3||num==4){
                this.transX = true;
            }
            else if(num==1||num==6){
                this.transY = true;
            }
            else{
                this.transX = true;
                this.transY = true;
            }

            this.reposX = false;
            this.reposY = false;
            if(num==0||num==3||num==5){
                this.reposX = true;
            }
            if(num == 0||num==1||num==2){
                this.reposY = true;
            }
            this.currentPoint = num;
            this.oppositePoint = 7 - num;
            this.state = State.resizing;
        }
    }

    private targetMouseDown(index: number) {
        this.setTarget(index);
        this.state = State.moving;
    }

    private mouseUp() {
        if (this.targetIndex == undefined)
            return;
        if (this.state == State.moving) {
            const index = this.targetIndex;
            this.transformChanged(index, this.objects[index].transform);
        }
        if (this.state == State.resizing) {
            this.currentPoint = -1;
            this.oppositePoint = -1;
            const index = this.targetIndex;
            this.transformChanged(index, this.objects[index].transform);
            console.log(this.objects[index].transform.scale.x)
        }
        this.state = State.none;
    }

    private prevMouseX: number = 0;
    private prevMouseY: number = 0;

    private mouseMove(x: number, y: number) {
        const deltaMouseX = x - this.prevMouseX;
        const deltaMouseY = y - this.prevMouseY;
        this.prevMouseX = x;
        this.prevMouseY = y;

        if (this.targetIndex == undefined)
            return;
        const target = this.objects[this.targetIndex];

        if (this.state == State.moving) {
            target.transform.position.x += deltaMouseX;
            target.transform.position.y += deltaMouseY;

            this.selectedTargetMoving(target.transform.position.x, target.transform.position.y);
        }
        
        if (this.state == State.resizing) {
            const cpoint = this.points[this.currentPoint];
            const opoint = this.points[this.oppositePoint]
            if(this.reposX)
            {
                target.x = x;
            }
            if(this.reposY)
            {
                target.y = y;
            }
            if (this.transX) {
                cpoint.x = x;
                const distanceX = (this.reposX?1:-1)*(opoint.x - cpoint.x);
                target.scale.x = distanceX/(target.getLocalBounds().width);
            }
            if (this.transY) {
                cpoint.y = y;
                const distanceY = (this.reposY?1:-1)*(opoint.y - cpoint.y);
                target.scale.y = distanceY/(target.getLocalBounds().height);
            }

        }
        this.updatePoints(this.currentPoint);
    }
    //calcs
}


enum State {
    none,
    moving,
    resizing,
    rotating,
}