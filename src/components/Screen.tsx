import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js';
import MovieClip from '../GameEngine/MovieClip';
import Graphic from '../GameEngine/Graphic';
import TransformEditor from './ScreenUtils/TransformEditor';

interface Props {
    width: number,
    height: number,
    frame: number,
    movieClip: MovieClip,
}

/*
★TODO
0.  만들기 이전에 받는 객체는 모두 PIXIObject로 처리, 외부에서 EngineObject로 변환 -> 
    아이디가 잇으면 좋을수도?(아이디는 나중에 처리해도 안늦음) index로처리해도 될듯?정해져있으니까?
    추가나 제거 경우에는 이벤트로 처리하거나? 프레임 전체를 초기화해야할듯
1.  UI graphic 함수화
2.  Transform Editor는 별도 객체로 처리 -> 이벤트 발생
3.  선택 클릭
4.  드래그 선택
5.  state 잘 정해서 마우스 이벤트 별로 정리
*/




const Screen: React.FC<Props> = (props) => {
    let stageDiv: HTMLElement | null;
    const app = new PIXI.Application({ width: props.width, height: props.height });

    const container = new PIXI.Container();
    container.interactiveChildren = true;
    container.interactive = true;
    app.stage.addChild(container);

    const transformEditor = new TransformEditor(app, { color: 0x00CC99, radius: 1, thickness: 5 });
    app.stage.interactive = true;
    app.stage.interactiveChildren = true;
    app.stage.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width / app.renderer.resolution,
         app.renderer.height / app.renderer.resolution);

    const frame = props.movieClip.getFrame(props.frame);
    let gameObjects:(MovieClip|Graphic)[] = frame.getObjects();
    let pixiObjects:PIXI.DisplayObject[] = [];
    
    frame.rebatchAll();
    for(let i = 0; i < gameObjects.length;i++){
        const gameObject = gameObjects[i];
        let pixiObject:PIXI.DisplayObject;

        if(gameObject instanceof MovieClip){
            pixiObject=gameObject.makeContainer(1)
        }
        else{
            pixiObject=gameObject.sprite;
        }

        container.addChild(pixiObject);
        pixiObjects.push(pixiObject);
    }
    transformEditor.setObjects(pixiObjects);
    transformEditor.transformChanged.push((index,transform)=>{
        const transform_ = gameObjects[index].getTransform();
        transform_.x = transform.position.x;
        transform_.y = transform.position.y;
        gameObjects[index].setTransform(transform_);
    });

    useEffect(() => {
        //초기화
        stageDiv?.appendChild(app.view);
        return () => {
            //마지막
        };
    }, []);

    return (
        <div>
            <div ref={ref => { stageDiv = ref }} />
            <button>그래픽 추가</button>
            <button>무비클립화 하기</button>
        </div>
    );
}
















// const Screen: React.FC<Props> = (props) => {

//     let stageDiv: HTMLElement | null;
//     const app = new PIXI.Application({ width: props.width, height: props.height });
//     const rect = new PIXI.Graphics();
//     let draggingObject:{pixiObject:PIXI.DisplayObject,gameObject:(MovieClip|Graphic)}|null;


//     useEffect(() => {
//         //초기화
//         stageDiv?.appendChild(app.view);
//         app.stage.addChild(rect);
//         app.stage.interactive = true;
//         app.stage.interactiveChildren = true;
//         app.stage.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width/app.renderer.resolution, app.renderer.height/app.renderer.resolution);
//         rect.zIndex = 0;
//         app.ticker.add((delta)=>{

//         });
//     }, [])

//     useEffect(() => {
//         const container = new PIXI.Container();
//         container.pivot.set(0.5, 0.5);
//         container.position.set(props.width / 2, props.height / 2);
//         const frame = props.movieClip.getFrame(props.frame);
//         frame.rebatchAll();
//         frame.getObjects().map((object) => {
//             let pixiObject:PIXI.DisplayObject;
//             if (object instanceof MovieClip) {
//                 pixiObject = object.makeContainer(1);
//             }
//             else {
//                 pixiObject = object.sprite;
//             }

//             pixiObject.interactive = true;
//             pixiObject.addListener('mouseover',(e)=>{objectOver(e,object)})
//             pixiObject.addListener('mouseout',(e)=>{objectOut(e,object)})
//             pixiObject.addListener('mousedown',(e)=>{objectMouseDown(e,object)})
//             app.stage.addListener('mouseup',mouseUp)
//             app.stage.addListener('mousemove',mouseMove)
//             container.addChild(pixiObject);
//         });
//         app.stage.addChild(container);
//     })

//     const objectOver = (event:PIXI.interaction.InteractionEvent,gameObject:Graphic|MovieClip)=>{
//         const bound  = event.target.getBounds()
//         rect.lineStyle(5, 0xFF0000);
//         rect.drawRect(bound.x,bound.y,bound.width,bound.height);
//     }
//     const objectOut = (event:PIXI.interaction.InteractionEvent,gameObject:Graphic|MovieClip)=>{
//         rect.clear();
//     }
//     const objectMouseDown = (event:PIXI.interaction.InteractionEvent,gameObject:Graphic|MovieClip)=>{
//         draggingObject = {pixiObject:event.target,gameObject:gameObject};
//     }
//     const mouseUp = ()=>{
//         if(draggingObject)
//         {
//             draggingObject.pixiObject.alpha = 1;
//         }
//         draggingObject = null;
//         console.log("up");
//     }

//     let prevMouseX:number;
//     let prevMouseY:number;

//     const mouseMove = (event:PIXI.interaction.InteractionEvent)=>{
//         const deltaMouseX = event.data.global.x - prevMouseX;
//         const deltaMouseY = event.data.global.y - prevMouseY;
//         prevMouseX = event.data.global.x;
//         prevMouseY = event.data.global.y;

//         if(draggingObject)
//         {   
//             const bound = draggingObject.pixiObject.getBounds();
//             rect.clear();
//             rect.lineStyle(5, 0x00CC66);
//             rect.drawRect(bound.x,bound.y,bound.width,bound.height);
//             draggingObject.pixiObject.transform.position.x+=deltaMouseX;
//             draggingObject.pixiObject.transform.position.y+=deltaMouseY;
//             draggingObject.pixiObject.alpha = 0.7;
//         }
//     }


//     return (
//         <div ref={ref => { stageDiv = ref }} />
//     );
// }

export default Screen;