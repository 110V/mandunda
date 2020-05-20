import Script from "./Script";
import Transform from "./Transform";
import MovieClip from "./MovieClip";
import Graphic from "./Graphic";

import * as PIXI from "pixi.js";

interface Batch{
    object: (MovieClip|Graphic);
    transform: Transform;
}


export default class Frame {
    public script: Script | null = null;
    private objects: (MovieClip | Graphic)[] = []
    private batches: Batch[] = [];


    public update(app: PIXI.Application, transform: Transform = Transform.init, entry: boolean = false) {
        this.objects.forEach(object => {
            object.update(app, transform);
        });

        if (entry) {
            this.rebatchAll();
        }
    }

    public rebatchAll()
    {
        this.batches.forEach(batch => {
            batch.object.setTransform(batch.transform);
        });
    }

    public addObject(object: MovieClip | Graphic,transform :Transform) {
        this.objects.push(object);
        const batch:Batch = {object,transform} as Batch; 
        this.batches.push(batch);
    }

    public getObjects()
    {
        return this.objects;
    }

    public getBatches()
    {
        return this.batches;
    }

    public render(app: PIXI.Application)
    {
        this.objects.forEach(object => {
            object.render(app);
        });
    }

    public makeContainer()
    {
        this.rebatchAll();
        const container = new PIXI.Container();

        this.objects.map((object)=>{
            if(object instanceof MovieClip){
                container.addChild(object.makeContainer(1));
            }
            else{
                container.addChild(object.sprite);
            }
            
        });
        return container;
    }
}