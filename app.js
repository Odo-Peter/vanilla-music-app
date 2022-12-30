const title = document.querySelector('#song-title');
const arist = document.querySelector('#artist');

const image = document.querySelector('img');
const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const nextBtn = document.querySelector('#next');
const begins = document.querySelector('#begins');
const ends = document.querySelector('#ends');
const timePanel = document.querySelector('#time-panel');
const timeGuage = document.querySelector('.guage');

let songIndex = 0;
let isPlaying = false;

const musics = [
  {
    songTitle: 'Way To Big',
    artistName: 'Burna Boy',
    musicSrc: 'music1',
    imgSrc: 'cover1',
  },
  {
    songTitle: 'Sunflower',
    artistName: 'Swae Lee & Post Malone',
    musicSrc: 'music2',
    imgSrc: 'cover2',
  },
  {
    songTitle: 'Ghetto Gospel',
    artistName: '2pac',
    musicSrc: 'music3',
    imgSrc: 'cover3',
  },
  {
    songTitle: 'Falling',
    artistName: '6lack & Baz',
    musicSrc: 'music4',
    imgSrc: 'cover4',
  },
  {
    songTitle: 'Pronto',
    artistName: 'Ajebor Hustlers',
    musicSrc: 'music5',
    imgSrc: 'cover5',
  },
  {
    songTitle: 'Angels',
    artistName: 'Khalid',
    musicSrc: 'music6',
    imgSrc: 'cover6',
  },
  {
    songTitle: 'Come And Go',
    artistName: 'Ardee',
    musicSrc: 'music7',
    imgSrc: 'cover7',
  },
  {
    songTitle: 'Good Times',
    artistName: 'Asa & Cavemen',
    musicSrc: 'music8',
    imgSrc: 'cover8',
  },
  {
    songTitle: 'Okwaraji',
    artistName: 'Blaqbones',
    musicSrc: 'music9',
    imgSrc: 'cover9',
  },
  {
    songTitle: 'Secrets',
    artistName: 'Burna Boy & Jeremih',
    musicSrc: 'music0',
    imgSrc: 'cover0',
  },
];

//loading the songs into the DOM
function loadSongs(songIndex) {
  resetValues();
  music.src = `./sounds/${musics[songIndex].musicSrc}.mp3`;

  music.load();

  image.src = `./img/${musics[songIndex].imgSrc}.jpg`;
  title.textContent = musics[songIndex].songTitle;
  arist.textContent = musics[songIndex].artistName;
  music.addEventListener('ended', nextSong);
}

loadSongs(songIndex);

//playing and pausing the song using the play method
function playSong() {
  isPlaying = true;
  music.play();
  setInterval(updateTimeLine, 1000);
  //   updateTimeLine();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
}

function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
}

function playAndPause() {
  if (!isPlaying) playSong();
  else pauseSong();
}

//go to next song in the list
function nextSong() {
  if (songIndex < musics.length - 1) songIndex++;
  else songIndex = 0;
  loadSongs(songIndex);
  playSong();
}

//go to previous song in the list
function prevSong() {
  if (songIndex > 0) songIndex--;
  else songIndex = musics.length - 1;
  loadSongs(songIndex);
  playSong();
}

//updating the time line/guage
function updateTimeLine() {
  if (!isNaN(music.duration)) {
    const duration = (music.duration / 60).toFixed(0);
    const durationRemain = parseFloat((music.duration % 60) / 60)
      .toString()
      .replace(['0.'], '')
      .substring(0, 2);
    const currentTime = Math.floor(music.currentTime / 60);
    const currentRemain = (Math.floor(music.currentTime % 60) / 100)
      .toString()
      .replace(['0.'], '')
      .substring(0, 2);

    const percentageWidth = music.currentTime * (100 / music.duration);

    timePanel.style.width = `${percentageWidth}%`;

    if (
      currentRemain == '1' ||
      currentRemain == '2' ||
      currentRemain == '3' ||
      currentRemain == '4' ||
      currentRemain == '5' ||
      currentRemain == '6' ||
      currentRemain == '7' ||
      currentRemain == '8' ||
      currentRemain == '9' ||
      currentRemain == '0'
    ) {
      begins.textContent = `${currentTime}:${currentRemain}0`;
    } else {
      begins.textContent = `${currentTime}:${currentRemain}`;
    }
    ends.textContent = `${duration}:${durationRemain}`;
  }
}

//updating the DOM to forward the song
function updateSong(e) {
  let newUpdate = e.clientX;
  music.currentTime = newUpdate;
  timePanel.style.width = `${newUpdate}%`;
  updateTimeLine();
  //   console.log(e);
  //   console.log(e.clientX);
}

//reseting the DOM values for the time guage
function resetValues() {
  begins.textContent = '0:00';
  ends.textContent = '0:00';
}

playBtn.addEventListener('click', playSong);

pauseBtn.addEventListener('click', pauseSong);

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

timeGuage.addEventListener('click', updateSong);
