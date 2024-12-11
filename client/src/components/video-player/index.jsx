import { useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

const VideoPlayer = ({ width = "100%", height = "100%", url }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    setMuted(newValue === 0);
  };

  const handleProgress = (currentState) => {
    if (!seeking) {
      setPlayed(currentState.played);
    }
  };

  const handleRewind = () => {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
  };

  const handleForward = () => {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleSeekChange = (newValue) => {
    setPlayed(newValue[0]);
    setSeeking(true);
  };

  const handleToggleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(played);
  };

  const pad = (string) => {
    return ("0" + string).slice(-2);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsValue = date.getUTCSeconds();

    if (hours) {
      return `${hours}:${pad(minutes)}:${secondsValue}`;
    }
    return `${minutes}:${secondsValue}`;
  };

  return (
    <div
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${
        isFullScreen ? "w-screen h-screen" : ""
      }`}
      ref={playerContainerRef}
      style={{ width: width, height: height }}
      onMouseEnter={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
      />
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => {
              handleSeekChange(value[0] / 100);
            }}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:text-white hover:bg-gray-700"
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                className="text-white hover:text-white hover:bg-gray-700"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForward}
                className="text-white hover:text-white hover:bg-gray-700"
              >
                <RotateCw className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleMute}
                className="text-white hover:text-white hover:bg-gray-700"
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => {
                  handleVolumeChange(value[0] / 100);
                }}
                className="w-24 cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white">
                {formatTime(played * playerRef?.current?.getDuration()) ||
                  "00:00"}
                / {formatTime(playerRef?.current?.getDuration()) || "00:00"}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleFullScreen}
                className="text-white hover:text-white hover:bg-gray-700"
              >
                {isFullScreen ? (
                  <Minimize className="h-6 w-6" />
                ) : (
                  <Maximize className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
