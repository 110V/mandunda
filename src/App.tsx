import React from 'react';
import styles from './App.module.css';
import Screen from './components/Screen';
import Graphic from './GameEngine/Graphic';
import Transform from './GameEngine/Transform';
import MovieClip from './GameEngine/MovieClip';
import ReactBlocklyComponent from 'react-blockly';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

import {INITIAL_XML,INITIAL_TOOLBOX_XML} from './content';
import * as Blockly from 'blockly/core';






const mainClip = new MovieClip();


var cat = new Graphic(new Transform(0,0),"https://cdn.discordapp.com/avatars/396332940927434752/2a3698758cf3160e4da1761577509197.webp?size=64");
var cat2 = new Graphic(new Transform(0,0),"https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"); 
var flash = new Graphic(new Transform(0,0),"https://cdn.discordapp.com/avatars/234243167979831297/3e17238f3fa55c867a049a8e392c6c8c.webp?size=128");



var mc = new MovieClip();
mc.addObject(cat,[1],[new Transform(-100,-50)]);
mc.addObject(flash,[1],[new Transform(0,50)]);

mainClip.addObject(cat2,[1],[new Transform(100,0)]);
mainClip.addObject(mc,[1],[new Transform(0,0)]);

const App = ()=>{
  return (
    <div className="App">
      <Screen width={1000} height={1000} movieClip={mainClip} frame={1} />
      <div><ReactBlocklyComponent.BlocklyEditor
        initialXml={INITIAL_XML}
        toolboxCategories={parseWorkspaceXml(INITIAL_TOOLBOX_XML)}
        wrapperDivClassName={styles.fullHeight}
        workspaceDidChange={(workspace:any)=>{console.log(Blockly.JavaScript.workspaceToCode(workspace))}} />
      </div>
    </div>
  );
}



export default App;
