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



const App = ()=>{
  return (
    <div className="App">
      <Screen width={500} height={500} movieClip={mainClip} frame={1} />
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
