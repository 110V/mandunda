import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import GameScreen from "./components/GameScreen";
import styles from "./GamePlayer.module.css"
interface MatchParams {
  id: string;
}

const GamePlayer: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  console.log(match.params.id);
  const [gameFile,setGameFile] = React.useState("");
  const [gameLoad,setGameLoad] = React.useState(false);
  React.useEffect(()=>{
    fetch("http://203.234.191.83:5353/"+match.params.id).then(x => x.text()).then(x => {
        setGameFile(x);
        setGameLoad(true)
      })
  },[])
  return (
      <div className={styles.GamePlayer}>
        {gameLoad?(<GameScreen className={styles.GameScreen} gameJson = {gameFile} width = {800} height={500}/>):(<div className= {styles.loading}>LOADING</div>)}
      </div>
      )
  
};

export default withRouter(GamePlayer);