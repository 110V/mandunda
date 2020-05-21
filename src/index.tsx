import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from './GameEngine/Game';
import MovieClip from './GameEngine/MovieClip';
import Transform from './GameEngine/Transform';
import Graphic from './GameEngine/Graphic';
import Matter from 'matter-js';
import BlockFunctions from './GameEngine/blockFuncs/BlockFunctions';
import ResourceManager from './GameEngine/ResourceManager';


let cat:any;
let cat2:any;
const game = new Game(500,500,document.body);
const rm = new ResourceManager(onLoadResources);
rm.add("t1","https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png")
.add("t2","https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png")
.add("t3","https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png").load();


function onLoadResources(){
  console.log("로드완료");

  cat = new Graphic(new Transform(0,0),rm.getTexture("t1"));
  cat2 = new Graphic(new Transform(0,0),rm.getTexture("t2")); 


  game.mainClip.addObject(cat2,[1],[new Transform(200,200)]);
  game.mainClip.addObject(cat,[1],[new Transform(100,100)]);
  game.start();
  game.addPhysics(cat2,false,0.001,10);
  game.addPhysics(cat,false,0.001,10);

  
}








const blockFunctions = BlockFunctions;


ReactDOM.render(
  <div>

  <button onClick = {()=>{
    blockFunctions["addForce"](game,cat,1,1)}}>test</button>
  <App /></div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
