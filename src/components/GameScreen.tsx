import React, { useRef, useEffect } from 'react'
import Game from '../GameEngine/Game';
import ResourceManager from '../GameEngine/ResourceManager';
import BlockFunctions from '../GameEngine/blockFuncs/BlockFunctions';
import MovieClip from '../GameEngine/MovieClip';


interface Props{
    width:number,
    height:number,
    gameJson:string,
    className?:string,
}


const GameScreen:React.FC<Props> = (props)=>{

    let game = useRef<Game>();
    let stageDiv = useRef<HTMLElement | null>(null);
    
    const init = ()=>{
        if(!stageDiv.current) {
            return;
        }
        if(props.gameJson==""){
            return;
        }
        game.current = new Game(props.width,props.height,stageDiv.current);
        
        try{
            const gameFile = JSON.parse(props.gameJson);
            const rm = new ResourceManager();
            rm.importJson(gameFile.resource, () => {
                if (game.current == undefined) {
                    return;
                }
                game.current.mainClip = MovieClip.importJson(gameFile.objects, rm, game.current);
                eval(`(function(game,blockFunctions){${gameFile.code}})`)(game.current, BlockFunctions);
                game.current.start();
            });
        }
        catch(e){
            alert("에러 발생")
            console.log(e);
        }
    }

    useEffect(() => {
        //초기화
        init();
        return () => {
            game.current?.destroy();
        }
    },[]);
    return (
        <div className = {props.className} style = {{border:"#F3F3F3 solid 3px"}} ref={ref => { stageDiv.current = ref }} />
    );
}


export default GameScreen;