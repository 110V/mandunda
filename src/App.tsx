import React, { useState, useRef, useEffect } from 'react';
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
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


import MenuIcon from '@material-ui/icons/Menu';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Menu from '@material-ui/core/Menu';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import { generateUUID } from './Utils';
import fileDownload from 'js-file-download';
import GameScreen from './components/GameScreen';

import ReactModal from './resizableWindow/index';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FrameBar from './components/FrameBar';




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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    editProjectNameButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginRight: theme.spacing(3),
    },
    shareButton:{
      marginLeft: "auto",
    },
    runButton:{
      position: "absolute",
      transform: "translate(calc(50vw - 100%), 0)",
      transformOrigin: "-50% 0"
    },
    Button:{
      width: "100%",
      height: "100%"
    },
    link:{
      color:"white",
      fontSize:"15px",
    },
  }),
);

let mainClip = new MovieClip("root");
let resourceManager = new ResourceManager();
let selectedIndex: number | undefined = undefined;
let updateScreen: Function = () => { };
let currentClip: MovieClip = mainClip;

let workspace: any;
let workspaceInit = false;

const App = () => {

  const workspaceChange = (w:any)=>{
    if(workspaceInit)
      return;
    console.log("적용!");
    workspaceInit=true;
    workspace = w;
  }
  const [gameFile, setGameFile] = useState<string>("");
  const [objectName, setObjectName] = useState("");
  const [isMovieclip, setIsMovieclip] = useState(false);
  const [selectedObject, setSelectedObject] = useState<MovieClip | Graphic | undefined>();
  //xy view
  const xel = useRef<HTMLDivElement|null>();
  const yel = useRef<HTMLDivElement|null>();

  const classes = useStyles();

  const graphicOpen = (e: any) => {
    const file = e.target.files[0];
    if (!file)
      return;
    var reader = new FileReader();
    reader.onload = function (e) {
      let contents = e.target?.result;
      if (contents) {
        let uuid = generateUUID();
        resourceManager.addDirectBase64(uuid, contents.toString()).loaderLoad(() => {
          addGraphic(file.name, uuid);
        });
      }
    };
    reader.readAsDataURL(file);
  }

  const addGraphic = (name: string, texId: string) => {
    const graphic = new Graphic(name, new Transform(0, 0), resourceManager, texId);
    currentClip.addObject(graphic, [1], [new Transform(0, 0)]);
    updateScreen(currentClip);
  }

  const changeCurrentClip = (clip: MovieClip) => {
    currentClip = clip;
    updateScreen(currentClip);
    renderBreadcrumbs();
  }

  const selectedTargetChanged = (index: number | undefined) => {
    selectedIndex = index;
    if (index == undefined) {
      setSelectedObject(undefined);
      setObjectName("");
      setIsMovieclip(false);
      return;
    }
    const nselectedObject = currentClip.getFrame(1).getObjects()[index];
    if (!nselectedObject)
      return;
    const pos = nselectedObject.getTransform();
    setSelectedObject(nselectedObject);
    setXYPos(pos.x,pos.y);


    setObjectName(nselectedObject.name);
    setIsMovieclip(nselectedObject instanceof MovieClip);
  }

  const onNameInputChanged = (event: any) => {
    if (selectedIndex == undefined) {
      setObjectName("");
      return;
    }
    setObjectName(event.target.value);
    if (selectedObject)
      selectedObject.name = event.target.value;
  }

  const removeSelectedObject = () => {
    if (selectedObject != undefined) {
      currentClip.getFrame(1).removeObject(selectedObject);
      updateScreen(currentClip);
    }
  }



  const goInside = () => {
    if (selectedObject != undefined && selectedObject instanceof MovieClip) {
      changeCurrentClip(selectedObject);
    }
  }

  const goOutside = () => {
    const parent = currentClip.getParent();
    if (parent)
      changeCurrentClip(parent);
  }

  const getResetFunc = (reset: Function) => {
    updateScreen = reset;
  }





  //materialui + ui

  //menu
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const saveProject = () => {
    const resource = resourceManager.exportJson();
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xml_text = Blockly.Xml.domToText(xml);

    const objectJson = mainClip.exportJson();
    fileDownload(JSON.stringify({ resource: resource, xml: xml_text, objects: objectJson }), projectName+".mandunda");
  }

  const projectOpen = (e: any) => {
    const file = e.target.files[0];
    if (!file)
      return;
    var reader = new FileReader();
    reader.onload = function (e) {
      let contents = e.target?.result;
      if (contents) {
        const project = JSON.parse(contents.toString());
        resourceManager = new ResourceManager();
        resourceManager.importJson(project.resource, () => {
          mainClip = MovieClip.importJson(project.objects, resourceManager);
          workspace.clear();
          var xml = Blockly.Xml.textToDom(project.xml);
          Blockly.Xml.domToWorkspace(xml, workspace);
          changeCurrentClip(mainClip);
        })
      }
    };
    reader.readAsText(file);
  }



  //projectname
  const [newPName,setNewPName] = useState("");
  const [projectName, setProjectName] = useState("New Project");
  const [openProjectNameDialog, setOpenProjectNameDialog] = useState(false);
  const handleEditProjectNameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProjectNameDialog(true);
  };
  const projectNameCloseDialog = (set:boolean)=>{
    if(set&&newPName!="")
    {
      setProjectName(newPName);
    }
    else{
      setNewPName(projectName);
    }
    setOpenProjectNameDialog(false);
  }

  //movieclipName
  const [newMcName,setNewMcName] = useState("new_movieclip");
  const [openMcNameDialog, setOpenMcNameDialog] = useState(false);
  const makeMovieClip = () => {
    if (selectedObject == undefined)
      return;

    setNewMcName("new_movieclip")
    setOpenMcNameDialog(true);
  }

  const mcNameCloseDialog = (set:boolean)=>{
    if (selectedObject == undefined)
      return;
    if(set&&newMcName!="")
    {
      currentClip.getFrame(1).removeObject(selectedObject);
      let newPos = selectedObject.getTransform();
      const movieClip = new MovieClip(newMcName, new Transform(newPos.x, newPos.y));
      newPos.x = 0;
      newPos.y = 0;
      movieClip.addObject(selectedObject, [1], [newPos]);
      currentClip.addObject(movieClip, [1], [movieClip.getTransform()]);
      updateScreen(currentClip);
    }
    setOpenMcNameDialog(false);
  }
  //upload

  const uploadProject = ()=>{
    fetch("http://203.234.191.83:5353/"+projectName.replace(" ","_"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: exportGameFile()
    }).then((response)=>{

      
      alert("업로드 완료! 주소가 복사되었습니다!");
      
    });
  }


  //gamerun
  const [gameRuning,setGameRunning] = useState(false);
  const handleRunClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    gameStart();
    setGameRunning(true);
  };
  const closeGameDialog = ()=>{
    setGameRunning(false);
  }


  const gameStart = () => {
    const resource = resourceManager.exportJson();
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const objectJson = mainClip.exportJson();

    setGameFile(exportGameFile());
  }

  const exportGameFile = ()=>{
    const resource = resourceManager.exportJson();
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const objectJson = mainClip.exportJson();

    return JSON.stringify({ resource: resource, code: code, objects: objectJson });
  }


  const resizeBlocky = ()=>{
    if(workspace!=null)
      Blockly.svgResize(workspace);
    }

  const setXYPos = (x: number, y: number) => {
    if (!xel.current || !yel.current)
      return;
    if (!selectedObject) {
      xel.current.textContent = "X: -";
      yel.current.textContent = "Y: -";
    }
    xel.current.textContent = "X: " + x;
    yel.current.textContent = "Y: " + y;
  }


const handleClick = ()=>{
  
}

const [breadObjects,setBreadObjects] = useState<(MovieClip)[]>([mainClip]);

const renderBreadcrumbs = ()=>{
  let current = currentClip; 
  let objects:(MovieClip)[] = [];

  for(let i = 0;i<3;i++){
    objects.push(current);
    if(current == mainClip)
    {
      break;
    }
    const parent = current.getParent();
    if(parent)
      current = parent;
  }
  setBreadObjects(objects.reverse());
}

  window.addEventListener("mousemove",resizeBlocky);

  return (
    <div className={styles.App}>

      <input onChange={projectOpen} accept="*" className={classes.input} id="contained-button-file2" type="file" />

      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose = {handleMenuClose}
      >
        <MenuItem onClick={saveProject}> Save Project　<SaveIcon /></MenuItem>
        <label htmlFor="contained-button-file2">
          <MenuItem onClick={handleMenuClose}>Load Project　<FolderOpenIcon /></MenuItem>
        </label> 
      </Menu>

      <AppBar position="static" className={styles.AppBar}>
        <Toolbar>
          <IconButton onClick = {handleMenuClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            만든다 - {projectName}
          </Typography>
          <IconButton onClick = {handleEditProjectNameClick} edge="start" className={classes.editProjectNameButton} color="inherit">
            <EditIcon />
          </IconButton>
          <IconButton onClick = {handleRunClick} edge="start" className={classes.runButton} color="inherit">
            <PlayArrowIcon style={{fontSize: 35}} />
          </IconButton>
          <CopyToClipboard  text={"http://mandunda.com/#/player/"+projectName.replace(" ","_")}>
          <Button onClick = {uploadProject} startIcon={<ShareIcon />} className = {classes.shareButton} color="inherit">Upload</Button>
          </CopyToClipboard>
        </Toolbar>
      </AppBar>



      <Dialog maxWidth={false} disableEscapeKeyDown={true} disableBackdropClick = {true} open={gameRuning} onClose={closeGameDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">게임 화면</DialogTitle>
        <DialogContent>
        <GameScreen width={800} height={500} gameJson={gameFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeGameDialog} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog disableEscapeKeyDown={true} open={openProjectNameDialog} onClose={()=>{projectNameCloseDialog(false)}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">프로젝트 이름</DialogTitle>
        <DialogContent>
          <DialogContentText>
            새로운 프로젝트 이름을 설정해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="프로젝트 이름"
            defaultValue={projectName}
            fullWidth
            onChange={(e)=>{setNewPName(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{projectNameCloseDialog(false)}} color="secondary">
            취소
          </Button>
          <Button onClick={()=>{projectNameCloseDialog(true)}} color="primary">
            설정
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openMcNameDialog} onClose={()=>{mcNameCloseDialog(false)}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">무비클립 이름</DialogTitle>
        <DialogContent>
          <DialogContentText>
            무비클립 이름을 설정해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="무비클립 이름"
            defaultValue={"new_movieclip"}
            fullWidth
            onChange={(e)=>{setNewPName(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{mcNameCloseDialog(false)}} color="secondary">
            취소
          </Button>
          <Button onClick={()=>{mcNameCloseDialog(true)}} color="primary">
            설정
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog disableEscapeKeyDown={true} open={openMcNameDialog} onClose={()=>{mcNameCloseDialog(false)}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">무비클립 이름</DialogTitle>
        <DialogContent>
          <DialogContentText>
            무비클립 이름을 설정해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="무비클립 이름"
            defaultValue={"new_movieclip"}
            fullWidth
            onChange={(e)=>{setNewPName(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{mcNameCloseDialog(false)}} color="secondary">
            취소
          </Button>
          <Button onClick={()=>{mcNameCloseDialog(true)}} color="primary">
            설정
          </Button>
        </DialogActions>
      </Dialog>




      <div className={styles.screenContainer}>
        <Screen className = {styles.Screen} selectedTargetMoving={setXYPos} resetFunc={getResetFunc} width={800} height={500} movieClip={currentClip} frame={1} selectedTargetChanged={selectedTargetChanged} />
        <div className={styles.Properties}>
          <div className = {styles.tfContainer}>
            <TextField
              label="오브젝트 이름"
              id="outlined-margin-dense"
              defaultValue="Default Value"
              className={styles.test1}
              margin="dense"
              variant="outlined"
              value={objectName} 
              onChange={onNameInputChanged}
            />
          </div>
          <div className={styles.test2}>
            <Breadcrumbs className = {classes.link} aria-label="breadcrumb">
              {breadObjects.indexOf(mainClip)==-1&&(<div></div>)} 
              {breadObjects.map((el) => 
                (<Link title = {el.name} onClick={()=>{changeCurrentClip(el)}} className = {classes.link}>{(el.name.slice(0,6)+"…").slice(0,el.name.length)}</Link>)
              )}
            </Breadcrumbs>
          </div>
          <div className={styles.test3}>
            <div ref = {ref => { xel.current = ref }}>X: - </div>
          </div>
          <div className={styles.test4}>
            <div ref = {ref => { yel.current = ref }}>Y: -</div>
          </div>
          <input onChange={graphicOpen} accept="image/*" className={classes.input} id="contained-button-file" type="file" />
          <div className={styles.test5}>
            <label htmlFor="contained-button-file">
              <Button className={classes.Button} variant="contained" color="primary" disableElevation component="span">그래픽 추가</Button>
            </label>
          </div>
          <div className={styles.test6}>
            <Button className={classes.Button} onClick={makeMovieClip} variant="contained" color="primary" disableElevation>무비클립화 하기</Button>
          </div>
          <div className={styles.test8}>
            <Button className={classes.Button} onClick={goInside} variant="outlined" disableElevation disabled={!isMovieclip}>안으로 들어가기</Button>
          </div>
          <div className={styles.test9}>
            <Button className={classes.Button} onClick={goOutside} variant="outlined" disableElevation disabled={(currentClip == mainClip)}>밖으로 나가기</Button>
          </div>
          <div className={styles.test7}>
            <Button className={classes.Button} onClick={removeSelectedObject} variant="contained" color="secondary" disableElevation>삭제</Button>
          </div>
        </div>
        <FrameBar currentFrame={1} maxFrame={10} frameChanged={(a)=>{}} />
      </div>



      <ReactModal initWidth={800} initHeight={400}
        onFocus={() => ("Modal is clicked")}
        isOpen={true}
        resizing={resizeBlocky}>
        <ReactBlocklyComponent.BlocklyEditor
        initialXml={INITIAL_XML}
        toolboxCategories={parseWorkspaceXml(INITIAL_TOOLBOX_XML)}
        wrapperDivClassName={styles.Blockly}
        workspaceDidChange={workspaceChange} />
      </ReactModal>


      <div id="copy" style={{display: "none"}}>{"http://mandunda.com/#/player/"+projectName.replace(" ","_")}</div>
    </div>
  );
}

export default App;



/*

 
      <TextField id="standard-basic" label="오브젝트 이름" value={objectName} onChange={onNameInputChanged} />
      <input onChange={graphicOpen} accept="image/*" className={classes.input} id="contained-button-file" type="file" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" disableElevation component="span">그래픽 추가</Button>
      </label>

      
      <Button onClick={goInside} variant="outlined" disableElevation disabled={!isMovieclip}>안으로 들어가기</Button>
      
      <Button onClick={removeSelectedObject} variant="contained" color="secondary" disableElevation>삭제</Button>
      <br />
      <Button onClick={gameStart} variant="contained" color="secondary" disableElevation>게임 실행</Button>
      <Button onClick={saveProject} variant="contained" color="secondary" disableElevation>프로젝트 저장</Button>
      <input onChange={projectOpen} accept="*" className={classes.input} id="contained-button-file2" type="file" />
      <label htmlFor="contained-button-file2">
        <Button variant="contained" color="primary" disableElevation component="span">프로젝트 불러오기</Button>
      </label>
*/