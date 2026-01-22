import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";
const Home = () => {

    const {audioRef,track, miniPlayer, zoom} = useContext(PlayerContext)
    return (
        <>
            <div className="h-screen bg-black">
                <div className={`flex ${zoom ? 'h-[80%]' : miniPlayer ? 'h-[95%]' : 'h-[90%]'}`}>
                    <Sidebar />
                    <Display />
                </div>
                <Player />
                <audio ref={audioRef} src={track.file} preload="auto"></audio>
            </div>
        </>
    )
}
export default Home;