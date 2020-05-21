import * as PIXI from "pixi.js";
import imageToBase64 from "image-to-base64"



export default class ResourceManager {
    private loader = new PIXI.Loader();
    private loading: number = 0;

    private queue: { name: string, data: string }[] = [];
    private struct:{name:string,data:string}[] = [];
    constructor(onLoaded: () => void) {
        this.loader.on("complete", onLoaded);
    }

    public add(name: string, data: string) {
        this.queue.push({ name: name, data: data });
        console.log(this.queue.length);
        return this;
    }

    public load() {
        this.loading = this.queue.length;

        for (let i = 0; i < this.queue.length; i++) {
            const el = this.queue[i];
            console.log(i);
            imageToBase64(el.data).then(
                (response: string) => {
                    console.log(el.name,response);
                    const base64 = "data:image/png;base64,"+response;
                    this.loader.add(el.name,base64 );
                    this.struct.push({name:el.name,data:base64});
                    this.onConvert();
                }
            ).catch(
                (error: string) => {
                    this.onConvert();
                    console.log(error);
                }
            )
        }
        this.queue = [];
        return this;
    }
    private onConvert() {
        this.loading--;
        if (this.loading == 0) {
            this.loader.load();
        }
    }

    public getTexture(name: string) {
        return this.loader.resources[name].texture;
    }

    public exportJson()
    {
        return JSON.stringify(this.struct);
    }

    public importJson(json:string)
    {
        this.struct = JSON.parse(json);
        this.struct.map(el=>{
            this.loader.add(el.name, el.data);
        })
        this.loader.load();
    }
}


