import { useEffect, useRef, useState } from 'react';
import './AudioPlayer.scss';
import { Pause, Play } from 'lucide-react';

type Props = {
  audioUrl: string;
  audioBlob?: Blob | null;
  setBars?: React.Dispatch<React.SetStateAction<number[]>>;
  setAudioDuration?: React.Dispatch<React.SetStateAction<number>>;
  audioWaveform?: number[];
};

const AudioPlayer = ({ audioBlob, audioUrl, setBars, setAudioDuration, audioWaveform }: Props) => {
  const audioEleRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>(audioWaveform ?? []);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);
  const progress = duration > 0 ? currentTime / duration : 0;

  const togglePlay = (play?: boolean) => {
    const audio = audioEleRef.current;
    if (!audio) return;

    if (audio.paused || play) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioEleRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDisplayTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setDisplayTime(audio.duration);
      if (setAudioDuration) {
        setAudioDuration(Math.ceil(audio.duration));
      }
    };
    const handleEnded = () => {
      setCurrentTime(0);
      setDisplayTime(audio.duration);
      setIsPlaying(false);
    };

    if (audio.readyState >= 1) {
      handleTimeUpdate();
      handleLoadedMetadata();
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl, setAudioDuration]);

  useEffect(() => {
    // If there is a audio blob then generate waveform bars heights
    const generateWaveform = async () => {
      if (!audioBlob) return;
      const audioContext = new AudioContext();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const rawData = audioBuffer.getChannelData(0);

      // generate
      const sampleCount = 30; // no of bars that we need
      const blockSize = Math.floor(rawData.length / sampleCount);
      const tmpWaveform: number[] = [];

      // generating waveform is very heavy task, so we have to store waveform in db
      for (let i = 0; i < sampleCount; i++) {
        const start = i * blockSize;
        let sum = 0;

        // calculate average of blocks
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[start + j]);
        }
        tmpWaveform.push(sum / blockSize);
      }
      if (setBars) {
        setBars(tmpWaveform);
      }
      setWaveform(tmpWaveform);
    };

    if (audioBlob) {
      generateWaveform();
    }
  }, [audioBlob, setWaveform, setBars]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioEleRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audioEleRef.current.currentTime = percentage * duration;
    togglePlay(true);
  };

  return (
    <div className="bc-AudioPlayer">
      <button className="bc-audio-player-play-pause-btn" onClick={() => togglePlay()}>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="bc-audio-player-bars" onClick={handleSeek}>
        {waveform?.map((value, ind) => {
          const playedBars = waveform.length * progress;
          return (
            <span
              className={`bc-audio-player-bar ${ind < playedBars ? 'played' : 'not-played'}`}
              style={{
                height: `${Math.max(value * 150, 5)}px`,
              }}
              key={ind}
            ></span>
          );
        })}
      </div>

      <span className="bc-audio-player-time">
        {Math.floor(displayTime / 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.ceil(displayTime % 60)
          .toString()
          .padStart(2, '0')}
      </span>
      <audio className="hidden" src={audioUrl} ref={audioEleRef}></audio>
    </div>
  );
};

export default AudioPlayer;
