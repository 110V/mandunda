import React, { useRef } from 'react'
import styles from './Frame.module.css'

interface Props{
    currentFrame:number,
    maxFrame:number,
    frameChanged:(frame:number)=>void,
}
interface FrameProps{
    selected:boolean,
    click:()=>void,
}

const FrameBar:React.FC<Props> = (props)=>{
    let frames:JSX.Element[] = [];
    for(let i = 1;i<=props.maxFrame;i++)
    {
        frames.push(<Frame selected = {props.currentFrame==i} click = {()=>{props.frameChanged(i)}}/>);
    }
    return (
        <div>
            <div className={styles.bar}>
                {frames}
            </div>
            <button>+</button>
            <button>-</button>
        </div>

    );
}

const Frame:React.FC<FrameProps> = (props)=>{
    return (
        <div className={props.selected?styles.sFrame:styles.usFrame} onClick={props.click}>
            
        </div>
    );
}


export default FrameBar;