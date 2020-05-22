export default class Transform {
    static init = new Transform(0, 0);

    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    roatation: number;

    constructor(x:number, y:number, scaleX = 1, scaleY = 1, rotation = 0) {
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.roatation = rotation;
    }


    public calcChildTransform(transform: Transform) {
        const parent = this;
        const child = transform;
        const rotatedPos = this.rotatePos(child.x, child.y, parent.roatation);
        return new Transform(
            rotatedPos.x * parent.scaleX + parent.x,
            rotatedPos.y * parent.scaleY + parent.y,
            child.scaleX * parent.scaleX,
            child.scaleY * parent.scaleY,
            child.roatation + parent.roatation);
    }

    private rotatePos(x:number, y:number, seta:number) {
        return {
            x: x * Math.cos(seta) - y * Math.sin(seta),
            y: y * Math.cos(seta) + x * Math.sin(seta)
        };
    }

    public clone()
    {
        return new Transform(this.x,this.y,this.scaleX,this.scaleY,this.roatation);
    }

    static fromObject(transform:any){
        return new Transform(transform.x,transform.y,transform.scaleX,transform.scaleY,transform.roatation);
    }
}