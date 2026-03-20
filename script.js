const STREAM_URL = "https://aps31.playlist.live-video.net/v1/playlist/CocGsPkWA1-XAlVbzNLbFS5tHmzkI07bOJwN-4dOJvRoi0S5UNJnC2qCwId1R0DaypZyRsSWdKFprqEykW9_MZj4dhgBJ1CZrxZ-L6N49ErWEtumu5dscy_JSku7Qt6398MA-8-_SUVIR3A-wRlXeCYnJaLVZjHEKMjSRzwMt-tySJ9t23KiQ-77-7ygHFu_WlnMUmS5f76FFueiWCoOJnQiwCCqUJ3YRjDnPz9rBUyOiu56bfeaKczueArjblooUHMZctCkUZoj-4HrYeXg6rPEOrcMtssS2Qb1iYkdx_OYQG18k-2cYLqfttloWW3-lmX_doFd1d_JNThImW3J0TjQycWFWgFVN400HCVRJ4ID6P-3LQOcHTqComZlViuNUszvuzAu5qkJ7XHuxFXp-Ebv3rBS8Pu25fnbNWIMNA8_R-usEbJsraCwAn5G-kdTt14EZGWksS--kZYxmlKnD43xVjo_pcxE5Etgxf9uAFpsgo4Xb8gFvuX9xa-pavMVDP8SVl2vWeLxt1gKQ05P9MpZI_Ibnuznyv-6KeeHJfiN-GDIPovbMQwx_IlhM9k34ee0oyWYUzCc4qMFoWUSIVbprf66EpBYdPy8_Mh1WSHv7Ed30_29Xh4k9JyEJ581ulmKbr0b1__4xlhVaMYbHmK8FljIsyvuFfbr2yCg0ZZRdeN6m07ksZEYeSXG3rPkalSeaOT_MtYgm3lQgsEe-qLV7tMzwY-7gtV8imJEgLTp7v3SrAJSL40ODE3nCFMA6KDiQfU3qHZGH-GaHfHJ_9Pi42yhg58NG47kv05aPLMmZJz4IzFpdqL3C9LJ94cNPD1ITKHhcjdZ9qihLHq92YRFDaqcd_BeKlZbzgcI8FeNFIpe_NqV9ObgoOGFc4R37ru1z-6IzC4XdMgM5WRxOnoA2UzyDsF6Rl7G6pJwlsk8yQ8l5IjzPEwyiz9RfE8vzFzBotr2So1OPXcA52dStK_gZyIrheqAXhzL9zNqVWxwRymLdzP-eXdkBvunaik8YUr0XgsLUlLe4xoMstOXhLslbEAwOXiaIAEqCXVzLXdlc3QtMjDYDg.m3u8";

const player = document.getElementById("livePlayer");
const streamStatus = document.getElementById("streamStatus");
const streamNotice = document.getElementById("streamNotice");
const viewerCount = document.getElementById("viewerCount");
const commentCount = document.getElementById("commentCount");
const commentsList = document.getElementById("commentsList");
const liveClock = document.getElementById("liveClock");
const possessionValue = document.getElementById("possessionValue");
const pressureValue = document.getElementById("pressureValue");
const moodValue = document.getElementById("moodValue");
const trendViewers = document.getElementById("trendViewers");
const trendChat = document.getElementById("trendChat");
const trendMoment = document.getElementById("trendMoment");

const commenters = [
    "StadiumPulse",
    "GoalLineGuru",
    "MatchBeat",
    "FanZone24",
    "NorthStand",
    "FullTimeVibes",
    "PressBoxLive",
    "CornerKickX",
    "RallyWatch",
    "PrimeSupporter"
];

const commentTemplates = [
    "That build-up was sharp.",
    "Crowd energy feels massive right now.",
    "This pace has changed completely.",
    "What a recovery play.",
    "Defending looks much tighter this minute.",
    "That replay angle would be wild.",
    "Momentum is definitely swinging.",
    "This match is opening up now.",
    "Pressure is building near the box.",
    "Huge save if that stays on target."
];

const commentOpeners = [
    "Falcons fans are saying",
    "The watch room thinks",
    "Everyone just noticed",
    "Studio chat says",
    "The home end is reacting like",
    "Commentators would call that"
];

const commentMoments = [
    "a huge momentum shift",
    "the cleanest passing spell of the night",
    "danger building on the left side",
    "the kind of pressure that creates mistakes",
    "a possible turning point",
    "real late-game tension"
];

const pressureStates = ["High", "Very High", "Rising", "Sustained"];
const moodStates = ["Electric", "Loud", "Explosive", "Locked In"];
const forecastStates = ["Goal threat", "Counter chance", "Set piece danger", "Momentum swing"];
const chatStates = ["Fast", "Very fast", "Flying", "Surging"];

let totalComments = 126;
let liveViewers = 18421;
let matchMinute = 67;
let matchSecond = 12;

function formatCount(value) {
    return new Intl.NumberFormat("en-US").format(value);
}

function setViewerCount(nextValue) {
    liveViewers = Math.max(12000, nextValue);
    viewerCount.textContent = formatCount(liveViewers);
}

function setCommentCount(nextValue) {
    totalComments = nextValue;
    commentCount.textContent = formatCount(totalComments);
}

function commentTimeLabel() {
    const secondsAgo = Math.floor(Math.random() * 50) + 3;
    return `${secondsAgo}s ago`;
}

function addComment(text, user) {
    const item = document.createElement("article");
    item.className = "comment-item";
    item.innerHTML = `
        <div class="comment-head">
            <span class="comment-user">${user}</span>
            <span class="comment-time">${commentTimeLabel()}</span>
        </div>
        <p class="comment-body">${text}</p>
    `;

    commentsList.prepend(item);

    while (commentsList.children.length > 12) {
        commentsList.removeChild(commentsList.lastElementChild);
    }

    setCommentCount(totalComments + 1);
}

function buildDynamicComment() {
    const opener = commentOpeners[Math.floor(Math.random() * commentOpeners.length)];
    const moment = commentMoments[Math.floor(Math.random() * commentMoments.length)];
    const tail = commentTemplates[Math.floor(Math.random() * commentTemplates.length)].toLowerCase();

    return `${opener} ${moment} right now. ${tail}`;
}

function seedComments() {
    for (let index = 0; index < 6; index += 1) {
        addComment(commentTemplates[index], commenters[index]);
    }
}

function cycleFakeActivity() {
    setInterval(() => {
        const delta = Math.floor(Math.random() * 320) - 110;
        setViewerCount(liveViewers + delta);
        trendViewers.textContent = `${delta >= 0 ? "+" : ""}${(delta / 100).toFixed(1)}%`;
        possessionValue.textContent = `${52 + Math.floor(Math.random() * 8)}% Home`;
        pressureValue.textContent = pressureStates[Math.floor(Math.random() * pressureStates.length)];
        moodValue.textContent = moodStates[Math.floor(Math.random() * moodStates.length)];
        trendChat.textContent = chatStates[Math.floor(Math.random() * chatStates.length)];
        trendMoment.textContent = forecastStates[Math.floor(Math.random() * forecastStates.length)];
    }, 1400);

    const queueNextComment = () => {
        const wait = 1100 + Math.floor(Math.random() * 1600);

        window.setTimeout(() => {
            const user = commenters[Math.floor(Math.random() * commenters.length)];
            addComment(buildDynamicComment(), user);
            queueNextComment();
        }, wait);
    };

    queueNextComment();
}

function startClock() {
    setInterval(() => {
        matchSecond += 1;

        if (matchSecond === 60) {
            matchSecond = 0;
            matchMinute += 1;
        }

        liveClock.textContent = `${String(matchMinute).padStart(2, "0")}:${String(matchSecond).padStart(2, "0")}`;
    }, 1000);
}

function loadStandardSource(url) {
    player.src = url;
    player.load();
}

function setNotice(text, isError = false) {
    streamNotice.textContent = text;
    streamNotice.style.color = isError ? "#ffd5da" : "";
    streamNotice.style.borderColor = isError ? "rgba(255, 77, 95, 0.28)" : "rgba(255, 255, 255, 0.08)";
    streamNotice.style.background = isError ? "rgba(255, 77, 95, 0.08)" : "rgba(255, 255, 255, 0.04)";
}

function loadStream() {
    if (!STREAM_URL) {
        streamStatus.textContent = "Set stream URL";
        setNotice(
            "Add your live stream link in script.js by updating STREAM_URL."
        );
        return;
    }

    streamStatus.textContent = "Connecting...";
    setNotice("Trying to connect to the live stream...");

    const isHlsStream = STREAM_URL.includes(".m3u8");

    if (isHlsStream && window.Hls && window.Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(STREAM_URL);
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            player.play().catch(() => {
                streamStatus.textContent = "Tap play to start";
            });
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
                streamStatus.textContent = "Stream error";
                setNotice(
                    "The stream URL was detected, but playback failed. This usually means the link is blocked by CORS, expired, or not exposed as a browser-playable stream.",
                    true
                );
            }
        });
    } else if (player.canPlayType("application/vnd.apple.mpegurl") || !isHlsStream) {
        loadStandardSource(STREAM_URL);
        player.play().catch(() => {
            streamStatus.textContent = "Tap play to start";
        });
    } else {
        streamStatus.textContent = "Unsupported stream";
        setNotice(
            "Use a direct MP4, WebM, or HLS .m3u8 stream URL for this prototype player.",
            true
        );
        return;
    }
}

player.addEventListener("loadedmetadata", () => {
    streamStatus.textContent = "Feed ready";
    setNotice("Stream metadata loaded. Starting playback...");
});

player.addEventListener("playing", () => {
    streamStatus.textContent = "Streaming now";
    setNotice("Live stream is active.");
});

player.addEventListener("waiting", () => {
    streamStatus.textContent = "Buffering...";
    setNotice("The stream is buffering. Playback should resume automatically.");
});

player.addEventListener("error", () => {
    streamStatus.textContent = "Playback error";
    setNotice(
        "The browser could not render this stream. If the link is valid, serve the page over localhost and confirm the stream host allows cross-origin playback.",
        true
    );
});

seedComments();
setViewerCount(liveViewers);
setCommentCount(totalComments);
cycleFakeActivity();
startClock();
loadStream();