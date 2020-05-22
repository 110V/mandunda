import React, { useRef, useEffect } from 'react'
import Game from '../GameEngine/Game';
import ResourceManager from '../GameEngine/ResourceManager';
import BlockFunctions from '../GameEngine/blockFuncs/BlockFunctions';
import MovieClip from '../GameEngine/MovieClip';


interface Props{
    width:number,
    height:number,
    gameJson:string,
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




        const gameFile = JSON.parse(props.gameJson);
        const rm = new ResourceManager();
        console.log(gameFile.code);
        rm.importJson(gameFile.resource,()=>{
            if(game.current==undefined){            
                return;
            }
            game.current.mainClip = MovieClip.importJson(gameFile.objects,rm,game.current);
            eval(`(function(game,blockFunctions){${gameFile.code}})`)(game.current,BlockFunctions);
            game.current.start();
        });
    }

    useEffect(() => {
        //초기화
        init();
        return () => {
            game.current?.destroy();
        }
    },[]);
    return (
        <div ref={ref => { stageDiv.current = ref }} />
    );
}


export default GameScreen;