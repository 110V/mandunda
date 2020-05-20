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


var cat = new Graphic(new Transform(0,0),"https://cdn.discordapp.com/avatars/396332940927434752/2a3698758cf3160e4da1761577509197.webp?size=64");
var cat2 = new Graphic(new Transform(0,0),"https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"); 
var flash = new Graphic(new Transform(0,0),"https://cdn.discordapp.com/avatars/234243167979831297/3e17238f3fa55c867a049a8e392c6c8c.webp?size=128");




const game = new Game(500,500,document.body);

game.mainClip.addObject(cat2,[1],[new Transform(200,200)]);

game.start();
game.addPhysics(cat2,false,0.1,0.001);
const blockFunctions = BlockFunctions;


ReactDOM.render(
  <div>

  <button onClick = {()=>{
    eval(`blockFunctions["addForce"](game,cat2,10,10)`)}}>test</button>
  <App /></div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
