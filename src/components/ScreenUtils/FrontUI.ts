import * as PIXI from 'pixi.js';

export default class FrontUI {
    private app: PIXI.Application;
    private container = new PIXI.Container();

    constructor(app: PIXI.Application) {
        this.app = app;

        app.ticker.add(()=>{this.tick()});
        this.app.stage.addChild(this.container);
    }

    private tick()
    {
        if(!this.app)
            return;
    }

    public drawRect(lineWidth: number, lineColor: number, alpha: number, x: number, y: number, width: number, height: number, rotation: number, pivot: { x: number, y: number } = { x: 0, y: 0 }) {
        console.log("draw!");
        this.drawShape(lineWidth, lineColor, alpha, (graphic: PIXI.Graphics) => {
            graphic.drawRect(x, y, width, height);
            graphic.rotation = rotation;
            graphic.pivot.set(pivot.x, pivot.y);
        });
    }

    public drawCircle(lineWidth: number, lineColor: number, alpha: number, x: number, y: number, radius: number, rotation: number, pivot: { x: number, y: number } = { x: 0, y: 0 }) {
        this.drawShape(lineWidth, lineColor, alpha, (graphic: PIXI.Graphics) => {
            graphic.drawCircle(x, y, radius);
            graphic.rotation = rotation;
        });
    }

    public drawLine(lineWidth: number, lineColor: number, alpha: number, x1: number, y1: number, x2: number, y2: number, rotation: number, pivot: { x: number, y: number } = { x: 0, y: 0 }) {
        this.drawShape(lineWidth, lineColor, alpha, (graphic: PIXI.Graphics) => {
            graphic.moveTo(x1, y1).lineTo(x2, y2);
            graphic.rotation = rotation;
        });
    }

    public drawShape(lineWidth: number, lineColor: number, alpha: number, drawing: (graphic:PIXI.Graphics) => void) {
        this.container.removeChildren();
        const graphic = new PIXI.Graphics();
        graphic.lineStyle(lineWidth, lineColor, alpha);
        drawing(graphic);
        this.container.addChild(graphic);
    }
}