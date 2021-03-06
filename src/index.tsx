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

import ResourceManager from './GameEngine/ResourceManager';
import Root from './Root';




ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
