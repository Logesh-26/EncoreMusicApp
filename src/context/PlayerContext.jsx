import { createContext , useEffect, useRef, useState} from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeBar = useRef();
    const volumeSeekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(1);
    const [mute, setMute] = useState(false);
    const [miniPlayer, setMiniPlayer] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: "--",
            minute: "--"
        },
        totalTime: {
            second: "--",
            minute: "--"
        }
    });


    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = ((audioRef.current.currentTime / audioRef.current.duration) * 100)+"%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        },1000)
    }, [audioRef])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    },[volume])
    
    const playWithID = async (id) => { 
        await setTrack(songsData[id])
        await audioRef.current.play()
        setPlayStatus(true);
    }
    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const before = async () => {
        if (shuffle) {
            const randomId = Math.floor(Math.random() * songsData.length)
            await setTrack(songsData[randomId]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else {
            if (track.id > 0 ) {
                await setTrack(songsData[track.id - 1])
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
        
    }

    const after = async () => {
        if (shuffle) {
            const randomId = Math.floor(Math.random() * songsData.length);
            await setTrack(songsData[randomId]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else {
            if (track.id < songsData.length - 1) {
                await setTrack(songsData[track.id + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
        
    }
    const seekBgClick = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const toggleLoop = () => {
        setLoop(!loop);
        audioRef.current.loop = !loop;
    }

    const volumeSeek = (e) => {
        const newVolume = e.nativeEvent.offsetX / volumeBar.current.offsetWidth;
        setVolume(Math.max(0, Math.min(1, newVolume)));
        audioRef.current.volume = volume;
        if (mute) setMute(false);
    }

    const toggleMute = () => {
        setMute(!mute);
        audioRef.current.muted = !mute;
    }

    const toggleMiniPlayer = () => {
        setMiniPlayer(!miniPlayer);
    }

    const toggleZoom = () => {
        setZoom(!zoom);
    }
    const toggleShuffle = () => {
        setShuffle(!shuffle);
    }
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        volumeBar,
        volumeSeekBar,
        track,
        playStatus,
        time,
        loop,
        volume,
        mute,
        miniPlayer,
        zoom,
        shuffle,
        setTrack,
        setPlayStatus,
        setTime,
        play,
        pause,
        playWithID,
        before,
        after,
        seekBgClick,
        toggleLoop,
        volumeSeek,
        toggleMute,
        toggleMiniPlayer,
        toggleZoom,
        toggleShuffle
    }
    return (
        <PlayerContext.Provider value={ contextValue }>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider