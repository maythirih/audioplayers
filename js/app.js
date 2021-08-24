//UI
const musiccontainer = document.getElementById('music-container');

const title = document.getElementById('title'),
    progresscontainer = document.getElementById('progress-container'),
    progress = document.getElementById('progress');

const audio = document.getElementById('audio');

const cover = document.getElementById('cover');

const prevbtn = document.getElementById('prev'),
    playbtn = document.getElementById('play'),
    nextbtn = document.getElementById('next');

let songindex = 0;

// song title
const songs = ['sample1','sample2','sample3'];

// console.log(songs[songindex]);

loadsong(songs[songindex]);

function loadsong(music){
    title.innerText = music;
    audio.src = `music/${music}.mp3`;
    cover.src = `img/${music}.jpg`;
}

// play song
playbtn.addEventListener('click',function (){
   // console.log('jhau');
    const isplaying = musiccontainer.classList.contains('play');

    if(isplaying){
        pausesong();
    }else{
        playsong();
    }
});

//play song
function playsong(){
    musiccontainer.classList.add('play');

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pausesong(){
    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Change Song

prevbtn.addEventListener('click',previoussong);
nextbtn.addEventListener('click',nextsong);

// Previous song
function previoussong(){
    songindex--;
    // console.log('hay');
    if(songindex < 0){
        songindex = songs.length -1;
    }

    loadsong(songs[songindex]);
    playsong();
}

function nextsong(){
    songindex++;
    // console.log('hay');
    if(songindex > songs.length -1){
        songindex = 0;
    }

    loadsong(songs[songindex]);
    playsong();
}
// Update Progress Bar
function updateprogress(e){
    // console.log(audio.currentTime);
    // console.log(audio.duration);

    //Method 1
    // const progressprercent =( audio.currentTime / audio.duration) * 100 ;
    // console.log(progressprercent);
    // progress.style.width = `${progressprercent}%`;

    //Event Call
    // console.log(e);
    // console.log(e.target);
    //console.log(this);
    // console.log(e.srcElement);

    //Method 2
    // const currentime = e.target.currentTime;
    // const duration = e.target.duration;
    // const progresspersent = (currentime / duration) * 100;
    // progress.style.width = `${progresspersent}%`;

    //Method 3
    // const {currentTime} = e.target;
    // const {duration} = e.target;
    // const progresspercent = (currentTime / duration) * 100;
    // progress.style.width = `${progresspercent}%`;

    //Method 4
    const {currentTime,duration} = e.target;
    const progresspercent = (currentTime / duration) * 100;
    progress.style.width = `${progresspercent}%`;

}

// Time play and stop update

audio.addEventListener('timeupdate',updateprogress);

//CLick On Progress Bar
progresscontainer.addEventListener('click',setprogress);

function setprogress(e){
    // console.log('hay');
    const width = e.target.clientWidth;
    // console.log(width);

    const clickx = e.offsetX;
    // console.log(clickx);

    const duration = audio.duration;
    // console.log(duration);

    audio.currentTime = (clickx / width) * duration;

}

// song end
audio.addEventListener('ended',nextsong);

// window.addEventListener('keydown',function (e){
//     // console.log(e.key);
//     if(e.keyCode == 32){
//         playbtn.click();
//     }
// })

// window.addEventListener('keydown',function (e){
//     // console.log(e.key);
//     if(e.keyCode == 32){
//         playsong();
//     }
// })


