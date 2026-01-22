import React,{useContext} from "react";
import {assets, songsData} from '../assets/assets'
import { PlayerContext } from "../context/PlayerContext";
const Player = () => {
    const { seekBg, seekBar, play, pause, playStatus, track, time, before, after, seekBgClick, loop, toggleLoop, volumeBar, volumeSeekBar, volume,
        mute, volumeSeek, toggleMute, miniPlayer, toggleMiniPlayer, zoom, toggleZoom, shuffle, toggleShuffle } = useContext(PlayerContext);
    return (
        <div className={`${zoom ? 'h-[20%]' : miniPlayer ? 'h-[5%]' : 'h-[10%]' }bg-black flex justify-between items-center text-white px-4 transition-all duration-300`} >
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12" src={track.image} alt="" />
                <div>
                    <p>{ track.name }</p>
                    <p>{ zoom ? track.desc : track.desc.slice(0,16)+"..." }</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img onClick={toggleShuffle} className="w-4 cursor-pointer" src={ assets.shuffle_icon } alt="" style={{filter: shuffle ? 'brightness(0.5)' : 'none'}}/>
                    <img onClick={before} className="w-4 cursor-pointer" src={ assets.prev_icon } alt="" />
                    { playStatus ? (
                        <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />
                    ) : (
                        <img onClick={play} className="w-4 cursor-pointer" src={ assets.play_icon } alt="" />
                    )}
                    <img onClick={after} className="w-4 cursor-pointer" src={ assets.next_icon } alt="" />
                    <img onClick={toggleLoop} className="w-4 cursor-pointer" src={assets.loop_icon} alt="" style={{ filter: loop ? 'brightness(0.5)' : 'none' }} />
                </div>
                {!miniPlayer && (
                    <div className="flex items-center gap-5">
                        <p>{ time.currentTime.minute }:{ time.currentTime.second} </p>
                        <div ref={ seekBg } onClick={seekBgClick}
                            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                            <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                        </div>
                        <p>{ time.totalTime.minute}:{time.totalTime.second} </p>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 opacity-75">
                <img onClick={play} className="w-4 cursor-pointer" src={ assets.play_icon } alt="" />

                { mute ? (  // Conditional icon for mute state
                    <img onClick={toggleMute} className="w-4 cursor-pointer" src={assets.volume_muted} alt="" />
                ) : (
                    <img onClick={toggleMute} className="w-4 cursor-pointer" src={ assets.volume_icon } alt="" />
                )}
                <div ref={volumeBar} onClick={volumeSeek} className="w-20 bg-slate-50 h-1 rounded cursor-pointer"> 
                    <hr ref={volumeSeekBar} className="h-1 border-none bg-green-800 rounded-full" style={{width: `${volume * 100}%`}} /> 
                </div>
                <img onClick={toggleMiniPlayer} className="w-4 cursor-pointer" src={ assets.mini_player_icon } alt="" />
                <img onClick={toggleZoom} className="w-4 cursor-pointer" src={assets.zoom_icon} alt="" />
            </div>
        </div>
    )
}
export default Player