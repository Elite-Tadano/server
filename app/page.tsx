"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Heart,
  Users,
  Gift,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Using the actual MP3 file you provided
const songs = [
  {
    id: 1,
    title: "Zaroor",
    url: "https://files.catbox.moe/g2qyl4.mp3",
  },
  {
    id: 2,
    title: "Hawa Banke",
    url: "https://files.catbox.moe/zkeyy0.mp3",
  },
  {
    id: 3,
    title: "Hawayein",
    url: "https://files.catbox.moe/7k7uu3.mp3",
  },
  {
    id: 4,
    title: "Jiya Dhadak Dhadak Jaye",
    url: "https://files.catbox.moe/kuu0jw.mp3",
  },
  {
    id: 5,
    title: "Meherbaan",
    url: "https://files.catbox.moe/8dhlfz.mp3",
  },
  {
    id: 6,
    title: "Tere Rastaa Chhodoon Na",
    url: "https://files.catbox.moe/3w8cpi.mp3",
  },
  {
    id: 7,
    title: "Tula Japnar Aahe",
    url: "https://files.catbox.moe/9ebb1a.mp3",
  },
];

const writings = [
  {
    id: 1,
    type: "Poem",
    title: "Mujhe mera ghr, Mil jata hai tujme",
    content:
      "Kehne ko to hum kitne durr hai,Lagte itne paas tum mere.\nTeri aankhon me woh basera hai,\nTo is duniya se hum kyun dare?\n\nKuch tum sunao, kuch hum,\nBaatein karein hum din raat.\nPhir bhi pata nahi kyun,\nTujh sang yeh samay thamta nhi sath…\n\nStory of my life,\nI drive her home, I drive all night,\nTo keep her warm,\nAnd time is frozen…\n\nTravelling between cities,\nNot knowing which one is mine.\nBut then, a quiet realization—\nYou were my home all along.\n\nTeri baahon me jo sukoon mila,\nWoh kisi sheher ki galiyon me nahi tha.\nNa kisi darwaze ki dastak thi, na kisi makaan ki chhat,\nBas tera saath tha, aur ek chhoti si muskurahat.",
    category: "poems",
  },
  {
    id: 2,
    type: "Writing",
    title: "Haan, sikhaya tune jeena jeena...",
    content:
      "Dear Dakuu bada,\nI hope this message finds you wrapped in warmth and smiles. It’s been almost five months with you, and I swear, these have been some of the most beautiful days of my life 😊.\nI don’t know how to put this into words, but you make my heart feel lighter, happier. Kitni pyaari lagti ho tum jab bolti ho. And then, those eyes… wo smile (uff, wo lips), woh cute-sa face—bus 🫣, yahi sab kaafi hai mujhe laal karne ke liye 😳.\nMazi rani, thank you for bringing out the best in me, coz I like me better when I’m with you. Shayad isse aur ache tareeke se kehna chahiye, lekin likhte waqt haath kaanp rahe hain 😬.\nSorry agar kabhi tumhe annoy karta hoon ya thoda (kabhi zyada bhi) gussa dila deta hoon 😅. But I promise, jitna ho sake, tumhe khush rakhne ki koshish karta rahunga—jaise kabhi kabhi kar bhi pata hoon 🤞. Thank you for all the little things you do; woh chhoti-chhoti cheezein dil ko sukoon deti hain 😌.\nHaan, sikhaya tune jeena jeena... haan, sikhaya tune jeena mere humdum >>>",
    category: "writings",
  },
  {
    id: 3,
    type: "Poem",
    title: "I wish",
    content:
      "I wish I could see her while she’s asleep,\nAnd hear her laughter in joy that she'd keep.\nI often imagine her, radiant and bright,\nHer beauty in daydreams, her soul full of light.\n\nI picture us walking, just one perfect day,\nFrom the memories she sent, that still softly stay.\n\nShe tells me she won’t be around for too long,\nThat thought just feels so wrong.\n\nI’m clinging to moments, frozen in time,\nWishing she’d stay, just a little more mine.\nShe looks like a baby, so gentle, so sweet,\nMy little Rani, whose love is complete.\n\nMy queen I would cherish, my goddess divine,\nMy Laxmi, my luck, in every sign.\nShe’s stronger than most, though she might cry,\nBut those tears hold courage that reaches the sky.\n\nI wish I could see her, hold her so near,\nPamper her softly, erase every fear.\nI wish for her joy, her peace, her smile,\nTo keep her beside me, just for a while.",
    category: "poems",
  },
  {
    id: 4,
    type: "Writing",
    title: "Mazi ranii, tumhare saath hamesha 🤌❤️",
    content:
      "**Hey, baate toh hoti rahegi, par ek aur cheez kehni thi tumse 😗.**\nPata nahi kab tak saath chalna likha hai, lekin aaj Promise Day hai, toh socha kyu na main bhi apni baatein tumse share karu.\nPata nahi kitna, lekin itna zarur pata hai ki **tumhe hamesha apne saath occupied rakhna chahta huu, tumhe hasana chahta huu un chhoti-chhoti baato mein 😁**.\nTumhe wo approval dena chahta huu jo tumhe ye ehsaas dilaye ki kabhi bhi kisi problem ka solution tumhe akela nahi dhoondhna padega—**tum bas bolo, aur woh kaam main kar dunga, pyaar se 🫣.**\nMain chahta hoon ki tum meri woh baatein bhi suno jo kehne se pehle main hamesha hesitate karta hoon 😶‍🌫️.\n**Tumse wada hai, main tumhe jyada gussa nahi dilane wala.**\nTumhare liye woh chhoti-chhoti pyaari cheezein karni hai jo tumhe bole bina ‘soo cutee yaar 😚’ kehne par majboor kar de.\nTumhare saare nakhre main uthane wala hoon, aur jitna bhi sona hai, **tumhe koi rokne wala nahi hai, I promise 😅.**\nAur jab bhi tumhe meri zarurat hogi, **main sab kuch chhod ke aunga, sirf tumhe console karne, tumhe pamper karne, wada hai 🤞**\nMazi ranii, tumhare saath hamesha 🤌❤️",
    category: "writings",
  },
  {
    id: 5,
    type: "Poem",
    title: "Will I see you again ?",
    content:
      "My dreams are filled with memories,\nMy soul still craves her melodies.\nShe was an angel, pure and bright,\nThe only fear she'd fade from sight.\n\nShe looked so pretty, sweet and kind,\nHer eyes like stars that lit my mind.\n\nI cry for just one more sweet chance,\nTo go back to our first glance.\nWish I could show how much she meant,\nHow every moment with her went.\n\nBut now I break on little things,\nMy heart caught up in silly flings.\nAm I just holding empty space,\nStill chasing shadows of her face?\n\nI want to grow, to be the man,\nTo love her more than others can.\nHer worth is high, beyond the sky,\nOh Dakuu, my heart feels so dry.\n\nI craved her voice, I need that call,\nTo rise, to heal, to give my all.\nTo make her smile, to make her see,\nHow much she truly meant to me.\n\nI will, I want please come back soon,\nMy heart still howls beneath the moon.\nOh Dakuu, you're my soul’s refrain,\nI miss you… will I see you again?",
    category: "poems",
  },
  {
    id: 6,
    type: "Poem",
    title: "Finding her in my memories",
    content:
      'I miss the way she was\nNow she seems distant,\nLike she\'s carrying a storm inside—\nBut won’t let me in.\nShe won’t say a word.\nAnd I stand here, helpless\nWishing I could hold all her pain,\nAnd give her back only love.\n\nThe world around her,\nSo tangled, so loud.\nPeople. Circumstances.\nResponsibilities piling up like walls\nWo thaki hui si lagti hai.\nAnd I\nI just want to be her sukoon.\n\nCome close and whisper softly:\n"Bas, bohot ho gaya…\nAb main dekh lunga sab kuch.\nTum bas araam karo."\n\nBut why…\nWhy does everything feel so incomplete without her?\nLike something’s missing—\nLike a puzzle with one missing piece.\n\nI wish I could make her smile again.\nI wish I could be the reason\nShe feels light again.\nNot upset, not confused\nJust beside her, quietly\nListening to the chapters she never got to finish.\nI want to be the peace\nShe’s been searching for.\n\nI miss her touch,\nHer smile,\nHer hair falling soft on her face,\nThe whole of her.\n\nEvery version.\nEvery flaw.\nEvery glow.\n\nI miss everything.\nAnd in truth\nI wish to be everything.\n\nBut still\nStill, I’m proud.\nProud to have met her.\nTo have sat in her orbit,\nEven for a little while.\n\nTo have shared those stolen moments\nThe laughs, the silences, the glances that said more than words ever could.\n\nI miss you, bada.\nMore than these lines can ever carry.\nMore than this heart can bear.\n\n— Your sukoon, always.',
    category: "poems",
  },
  {
    id: 7,
    type: "Writing",
    title: "Thank You 🥰",
    content:
      "**So my dear Dakkuu,**\nFor today I would say it’s valentines day**.** Umm… do you know its meaning? Okii, let me tell you—**the name *Valentine* comes from a Latin word meaning *“strength.”*** Ohh👀, it seems like it means someone who gives you strength to accomplish anything.\n**My dear Dakku,** There are many things, many ideas I wish I could spend with you. But you are too faaaar away, dear 🥲. So bada, I want to thank you many times for being the strength and making me realize something new inside of me, teaching me another side of this world😌. Also, **strength comes from you because you are the strength itself, bada.** Aap kitne strong ho (Bhale hi aap bolo ki nhi ho lekin…), thoda sa emotional bhi, lekin sach me kitna kuch saha hai apne. Kitne sare experiences. **Sach me, apka hath kitna bhi pyara sa ho, mere liye toh perfect lagega.**\nAap brave ho, rona to aata hai thoda, lekin apka ignorance is very strong, utna ik😅. Apke name me hi meaning hai: efficiency, ability, or dexterity. **Sach me, you are a diamond for me.** Ranii bhi and Apsara bhi.\n**Thanks for everything, Dakudiii.** ❤️✨",
    category: "writings",
  },
];

// Floating elements for background animation
const FloatingElement = ({
  children,
  delay = 0,
  duration = 3,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <div
    className="absolute animate-float opacity-20 pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
);

// Modal Component
const WritingModal = ({
  writing,
  isOpen,
  onClose,
  isDark,
  isLiked,
  onToggleLike,
}: {
  writing: (typeof writings)[0];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  isLiked: boolean;
  onToggleLike: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-pink-900/95 backdrop-blur-md border border-white/20"
            : "bg-gradient-to-br from-white/95 via-purple-50/95 to-pink-50/95 backdrop-blur-md border border-purple/20"
        }`}
      >
        {/* Floating elements in modal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-pulse ${
                isDark ? "text-pink-300/20" : "text-pink-400/20"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Heart className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                  isDark
                    ? "bg-gradient-to-r from-pink-500 to-purple-500"
                    : "bg-gradient-to-r from-pink-400 to-purple-400"
                }`}
              >
                {writing.type === "Poem" ? "📝" : "✍️"}
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className={`mb-2 ${
                    isDark
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {writing.type}
                </Badge>
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {writing.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleLike}
                className="rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : isDark
                      ? "text-gray-400 hover:text-red-400"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={`rounded-full ${
                  isDark ? "hover:bg-white/20" : "hover:bg-black/10"
                }`}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 pb-6 max-h-96 overflow-y-auto">
          <div
            className={`prose prose-lg max-w-none ${
              isDark ? "prose-invert prose-pink" : "prose-gray"
            }`}
          >
            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {writing.content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t ${
            isDark ? "border-white/20" : "border-purple/20"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Written with love for our friendship
            </span>
            <Heart className="w-4 h-4 text-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FriendshipDayWebsite() {
  const [isDark, setIsDark] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedWriting, setSelectedWriting] = useState<
    (typeof writings)[0] | null
  >(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioError, setAudioError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setAudioLoading(true);
      setAudioError(false);
    };

    const handleCanPlay = () => {
      setAudioLoading(false);
      setAudioError(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setAudioError(true);
      setAudioLoading(false);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentAudioTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSongUrl]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSongUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error);
          setAudioError(true);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleSongChange = (songTitle: string) => {
    const selectedSong = songs.find((song) => song.title === songTitle);
    if (selectedSong) {
      setCurrentSong(songTitle);
      setCurrentSongUrl(selectedSong.url);
      setIsPlaying(false);
      setAudioError(false);
      setCurrentAudioTime(0);

      // Load the new audio source
      if (audioRef.current) {
        audioRef.current.src = selectedSong.url;
        audioRef.current.load();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openWriting = (writing: (typeof writings)[0]) => {
    setSelectedWriting(writing);
  };

  const closeWriting = () => {
    setSelectedWriting(null);
  };

  const filteredWritings = writings.filter((writing) => {
    if (filter === "all") return true;
    if (filter === "poems") return writing.category === "poems";
    if (filter === "writings") return writing.category === "writings";
    return true;
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatAudioTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingElement
            key={`heart-${i}`}
            delay={i * 0.5}
            duration={4 + Math.random() * 2}
          >
            <Heart
              className={`w-6 h-6 ${
                isDark ? "text-pink-300" : "text-pink-400"
              }`}
            />
          </FloatingElement>
        ))}

        {/* Floating Stars */}
        {Array.from({ length: 10 }).map((_, i) => (
          <FloatingElement
            key={`star-${i}`}
            delay={i * 0.7}
            duration={5 + Math.random() * 2}
          >
            <Star
              className={`w-4 h-4 ${
                isDark ? "text-yellow-300" : "text-yellow-500"
              }`}
            />
          </FloatingElement>
        ))}

        {/* Floating Sparkles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingElement
            key={`sparkle-${i}`}
            delay={i * 0.3}
            duration={3 + Math.random() * 2}
          >
            <Sparkles
              className={`w-5 h-5 ${
                isDark ? "text-purple-300" : "text-purple-500"
              }`}
            />
          </FloatingElement>
        ))}

        {/* Gradient Orbs */}
        <div
          className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-pink-500/20" : "bg-pink-300/30"
          }`}
        />
        <div
          className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-purple-500/20" : "bg-purple-300/30"
          }`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-24 h-24 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-indigo-500/20" : "bg-indigo-300/30"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header
        className={`relative z-10 flex items-center justify-between p-6 backdrop-blur-sm ${
          isDark ? "bg-black/20" : "bg-white/20"
        } border-b border-white/10`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Users
              className={`w-8 h-8 ${
                isDark ? "text-pink-400" : "text-pink-600"
              }`}
            />
            <Heart className="w-4 h-4 text-red-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Friendship Day
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {formatTime(currentTime)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`rounded-full transition-all duration-300 ${
              isDark
                ? "hover:bg-white/20 text-yellow-400"
                : "hover:bg-black/10 text-indigo-600"
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-3 shadow-lg animate-bounce">
                  <Gift className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Floating hearts around image */}
              <div
                className="absolute -top-2 -left-2 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              </div>
              <div
                className="absolute -bottom-2 -right-2 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              </div>
            </div>
          </div>

          <h2
            className={`text-5xl font-bold mb-6 ${
              isDark
                ? "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            }`}
          >
            To My Bettu Rani
          </h2>

          <p
            className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Today we celebrate the beautiful bond we share, the countless
            memories we've created, and the incredible journey of our
            friendship. You make life brighter! ✨
          </p>
          <br />
          <p
            className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? "text-fuchsia-200" : "text-indigo-400"
            }`}
          >
            I told you one day that I would make this present dedicated to all
            of my writings and poem written for you through this heart. It meant
            a lot bada, I am so greatful for everything we shared, all the
            memories we made. 💞
          </p>
          <br />
          <p
            className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Like you asked me about my fav song, but I don't think ki apka koi
            fav hai, I mean sab ache lgte na 😶. That's why I created this, aap
            ko jo pyara lage aap sunn skti bada 😊
          </p>
        </div>

        {/* Music Section */}
        <div
          className={`rounded-3xl p-8 mb-16 backdrop-blur-md shadow-2xl border ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/40 border-white/30"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Background Music
              </h3>
              {audioLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-500 border-t-transparent"></div>
              )}
              {audioError && (
                <span className="text-red-500 text-sm">⚠️ Audio error</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className={`rounded-full transition-all duration-300 ${
                  isDark ? "hover:bg-white/20" : "hover:bg-black/10"
                }`}
                disabled={!currentSong}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                disabled={!currentSong || audioError || audioLoading}
                className={`rounded-full transition-all duration-300 ${
                  isDark ? "hover:bg-white/20" : "hover:bg-black/10"
                } ${isPlaying ? "bg-pink-500/20 scale-110" : ""}`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Select onValueChange={handleSongChange} value={currentSong}>
              <SelectTrigger
                className={`w-full ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white/60 border-gray/20 text-gray-800"
                }`}
              >
                <SelectValue placeholder="Choose a song..." />
              </SelectTrigger>
              <SelectContent>
                {songs.map((song) => (
                  <SelectItem key={song.id} value={song.title}>
                    <div className="flex flex-col">
                      <span>{song.title}</span>
                      <span className="text-xs opacity-70">
                        {song.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <VolumeX
                className={`w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
                disabled={!currentSong}
              />
              <Volume2
                className={`w-4 h-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>

            {currentSong && (
              <div
                className={`text-center text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {isPlaying ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-pink-500 animate-pulse"></div>
                      <div
                        className="w-1 h-6 bg-purple-500 animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-3 bg-indigo-500 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1 h-5 bg-pink-500 animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                    </div>
                    <span>
                      Now playing:{" "}
                      <span className="font-medium">{currentSong}</span>
                    </span>
                  </div>
                ) : (
                  <span>
                    Selected: <span className="font-medium">{currentSong}</span>{" "}
                    - Click play to start
                  </span>
                )}

                {duration > 0 && (
                  <div className="mt-2 text-xs">
                    {formatAudioTime(currentAudioTime)} /{" "}
                    {formatAudioTime(duration)}
                  </div>
                )}
              </div>
            )}
          </div>

          <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
        </div>

        {/* Writings Section */}
        <div className="text-center mb-12">
          <h3
            className={`text-4xl font-bold mb-4 ${
              isDark
                ? "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            Our Story in Words
          </h3>
          <p
            className={`text-lg mb-8 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            A collection of poems and writings celebrating our friendship, each
            one a small piece of my heart dedicated to you. Click the cards to
            read them! 💕
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {[
              { key: "all", label: "All" },
              { key: "poems", label: "Poems" },
              { key: "writings", label: "Writings" },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "default" : "ghost"}
                onClick={() => setFilter(tab.key)}
                className={`rounded-full px-6 transition-all duration-300 ${
                  filter === tab.key
                    ? isDark
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : isDark
                    ? "hover:bg-white/20 text-gray-300"
                    : "hover:bg-black/10 text-gray-700"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWritings.map((writing) => (
            <Card
              key={writing.id}
              className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer ${
                isDark
                  ? "bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border-white/20"
                  : "bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-md border-purple/20"
              } shadow-xl`}
              onClick={() => openWriting(writing)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        isDark
                          ? "bg-gradient-to-r from-pink-500 to-purple-500"
                          : "bg-gradient-to-r from-pink-400 to-purple-400"
                      }`}
                    >
                      {writing.type === "Poem" ? "📝" : "✍️"}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        isDark
                          ? "bg-white/20 text-white"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {writing.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(writing.id);
                    }}
                    className="rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        likedItems.includes(writing.id)
                          ? "fill-red-500 text-red-500"
                          : isDark
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                    />
                  </Button>
                </div>

                <h4
                  className={`text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {writing.title}
                </h4>

                <p
                  className={`text-sm leading-relaxed line-clamp-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {writing.content}
                </p>

                <div className="mt-4 flex items-center justify-center">
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Click to read more
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16 p-8">
          <div className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
            <span
              className={`${
                isDark
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              Happy Friendship Day my dear dakudiii
            </span>
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Thank you for being the most amazing friend anyone could ask for! 💕
          </p>
        </div>
      </main>

      {/* Writing Modal */}
      {selectedWriting && (
        <WritingModal
          writing={selectedWriting}
          isOpen={!!selectedWriting}
          onClose={closeWriting}
          isDark={isDark}
          isLiked={likedItems.includes(selectedWriting.id)}
          onToggleLike={() => toggleLike(selectedWriting.id)}
        />
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
