import React, { useState } from 'react';
import styles from './App.module.css';
import Screen from './components/Screen';
import Graphic from './GameEngine/Graphic';
import Transform from './GameEngine/Transform';
import MovieClip from './GameEngine/MovieClip';
import ReactBlocklyComponent from 'react-blockly';
import parseWorkspaceXml from 'react-blockly/src/BlocklyHelper';

import { INITIAL_XML, INITIAL_TOOLBOX_XML } from './content';
import * as Blockly from 'blockly/core';
import ResourceManager from './GameEngine/ResourceManager';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { generateUUID } from './Utils';
import fileDownload from 'js-file-download';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

let mainClip = new MovieClip("root");
let resourceManager = new ResourceManager();
let selectedIndex:number|undefined = undefined;
let selectedObject:MovieClip|Graphic|undefined;
let updateScreen:Function = ()=>{};
let currentClip:MovieClip = mainClip;

let workspace:any;
const App = () => {
  const [objectName,setObjectName] = useState("");
  const [isMovieclip,setIsMovieclip] = useState(false);
  const classes = useStyles();

  const graphicOpen = (e:any)=>{
    const file = e.target.files[0];
    if(!file)
      return;
    var reader = new FileReader();
    reader.onload = function (e) {
        let contents = e.target?.result;
        if(contents)
        {
          let uuid = generateUUID();
          resourceManager.addDirectBase64(uuid,contents.toString()).loaderLoad(()=>{
            addGraphic(file.name,uuid);
          });
        }
    };
    reader.readAsDataURL(file);
  }

  const addGraphic = (name: string, texId: string) => {
    const graphic = new Graphic(name, new Transform(0, 0), resourceManager, texId);
    currentClip.addObject(graphic, [1], [new Transform(0, 0)]);
    updateScreen(currentClip);
    console.log(texId);
  }

  const changeCurrentClip = (clip:MovieClip)=>{
    currentClip = clip;
    updateScreen(currentClip);
  }

  const selectedTargetChanged = (index:number|undefined)=>{
    selectedIndex = index;
    
    if(index==undefined)
    {
      selectedObject = undefined;
      setObjectName("");
      setIsMovieclip(false);
      return;
    }
    selectedObject = currentClip.getFrame(1).getObjects()[index];
    if(!selectedObject)
      return;
    setObjectName(selectedObject.name);
    setIsMovieclip(selectedObject instanceof MovieClip);
  }

  const onNameInputChanged = (event:any)=>{
    if(selectedIndex==undefined)
    {
      setObjectName("");
      return;
    }
    setObjectName(event.target.value);
    if(selectedObject)
      selectedObject.name = event.target.value;
  }

  const removeSelectedObject = ()=>{
    if(selectedObject!=undefined){
      currentClip.getFrame(1).removeObject(selectedObject);
      updateScreen(currentClip);
      console.log("삭제");
    }
  }

  const makeMovieClip = ()=>{
    if(selectedObject==undefined)
      return;

    let movieClipName = prompt('무비클립 이름을 입력하세요.', 'new_movieclip');
    if(movieClipName==null)
    {
      alert("이름을 입력해주세요.")
      return;
    }
    currentClip.getFrame(1).removeObject(selectedObject);
    let newPos = selectedObject.getTransform();
    const movieClip = new MovieClip(movieClipName,new Transform(newPos.x,newPos.y));
    newPos.x = 0;
    newPos.y = 0;
    movieClip.addObject(selectedObject,[1],[newPos]);
    currentClip.addObject(movieClip,[1],[movieClip.getTransform()]);
    updateScreen(currentClip);
  }

  const goInside = ()=>{
    if(selectedObject!=undefined&&selectedObject instanceof MovieClip)
    {
      changeCurrentClip(selectedObject);
    }   
  }

  const goOutside = ()=>{
      const parent = currentClip.getParent();
      if(parent)
        changeCurrentClip(parent);
  }

  
  const getResetFunc = (reset:Function)=>{
    updateScreen = reset;
  }

  const gameStart = ()=>{
    const resource = resourceManager.exportJson();
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const objectJson = mainClip.exportJson();

    console.log(JSON.stringify({resource:resource,code:code,objects:objectJson}));
  }

  const saveProject = ()=>{
    const resource = resourceManager.exportJson();
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xml_text = Blockly.Xml.domToText(xml);

    const objectJson = mainClip.exportJson();
    fileDownload(JSON.stringify({resource:resource,xml:xml_text,objects:objectJson}),"project.mandunda");
  }

  const projectOpen = (e:any)=>{
    const file = e.target.files[0];
    if(!file)
      return;
    var reader = new FileReader();
    reader.onload = function (e) {
        let contents = e.target?.result;
        if(contents)
        {
          const project = JSON.parse(contents.toString());
          resourceManager = new ResourceManager();
          resourceManager.importJson(project.resource,()=>{
            mainClip = MovieClip.importJson(project.objects,resourceManager);
            workspace.clear();
            var xml = Blockly.Xml.textToDom(project.xml);
            Blockly.Xml.domToWorkspace(xml, workspace);
            changeCurrentClip(mainClip);
          })
        }
    };
    reader.readAsText(file);
  }




  return (
    <div className="App">
      <Screen resetFunc = {getResetFunc} width={800} height={500} movieClip={currentClip} frame={1} selectedTargetChanged={selectedTargetChanged}/>
      <TextField id="standard-basic" label="오브젝트 이름" value={objectName} onChange={onNameInputChanged}/>
      <input onChange={graphicOpen} accept="image/*" className={classes.input} id="contained-button-file" type="file"/>
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" disableElevation component="span">그래픽 추가</Button>
      </label>
      <Button onClick={makeMovieClip} variant="contained" color="primary" disableElevation>무비클립화 하기</Button>
      <Button onClick={goInside} variant="outlined" disableElevation disabled={!isMovieclip}>안으로 들어가기</Button>
      <Button onClick={goOutside} variant="outlined" disableElevation disabled={(currentClip == mainClip)}>밖으로 나가기 현재:{currentClip.name}</Button>
      <Button onClick={removeSelectedObject} variant="contained" color="secondary" disableElevation>삭제</Button>
      <br />
      <Button onClick = {gameStart} variant="contained" color="secondary" disableElevation>게임 실행</Button>
      <Button onClick = {saveProject} variant="contained" color="secondary" disableElevation>프로젝트 저장</Button>
      <input onChange={projectOpen} accept="*" className={classes.input} id="contained-button-file2" type="file"/>
      <label htmlFor="contained-button-file2">
        <Button variant="contained" color="primary" disableElevation component="span">프로젝트 불러오기</Button>
      </label>
      <div><ReactBlocklyComponent.BlocklyEditor
        initialXml={INITIAL_XML}
        toolboxCategories={parseWorkspaceXml(INITIAL_TOOLBOX_XML)}
        wrapperDivClassName={styles.fullHeight}
        workspaceDidChange={(w: any) => { workspace = w }} />
      </div>
    </div>
  );
}



export default App;
