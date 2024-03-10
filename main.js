/* elementlere ulaşmak */

const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


//sira
let index = 4

//dongu
let loop = true

//json verisi
const songsList = [
   {
      name: "gelo ew ki bu",
      link: "assets/gelo-ew-ki-bu.mp3",
      artist: "aram tigran",
      image: "assets/aram-tigran.jpeg",
   },
   {
      name: "gitme kal",
      link: "assets/yara-bere-icindeyim.mp3",
      artist: "Hira-i Zerdust",
      image: "assets/Hirai.jpeg"
   },
   {
      name: "aramam",
      link: "assets/aramam.mp3",
      artist: "Ibrahim tatlises",
      image: "assets/ibrahim-tatlises.jpeg"
   },
   {
      name: "Ax Eman",
      link: "assets/ax-eman.mp3",
      artist: "Rewsan Celiker",
      image: "assets/rewsan-celiker.jpeg"
   },
   {
      name: "Dinle",
      link: "assets/dinle.mp3",
      artist: "Mahsun Kirmizigul",
      image: "assets/mahsun.jpeg"
   }
]


// oynat
const playAudio = () => {
   audio.play()
   pauseButton.classList.remove('hide') //göster
   playButton.classList.add('hide') // gizle
}

//durdur
const pauseAudio = () => {
   audio.pause()
   pauseButton.classList.remove('hide')
   playButton.classList.add('hide')
}

/* 
   {
    name: "gitme kal",
    link: "assers/yara-bere-içindeyim.mp3",
    artist: "hira-i zerdust",
    image: "assets/hirai.jep"
   }

*/

// şarkı ata
const setSong = (arrayIndex) => {
   let { name, link, artist, image } = songsList[arrayIndex]

   console.log(artist)
   audio.src = link
   songName.innerHTML = name //dinle
   songArtist.innerHTML = artist
   songImage.src = image


   audio.onloadedmetadata = () => {
      //saniye hesapla
      maxDuration.innerText = timeFormatter(audio.duration)
   }

   playListContainer.classList.add('hide')
   playAudio()

}

//surekli saniye kontrolu yap
setInterval(() => {
   currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
   //PROGRESS İ İLERLETECEĞİZ
   currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//şarkı süresi değişim kismi tıklanıldığında
progressBar.addEventListener('click', (event) => {
   // başlangıc
   let coordStart = progressBar.getBoundingClientRect().left
   console.log(coordStart)
   //x ekseninde tiklama noktası
   let coordEnd = event.clientX
   console.log(coordEnd)
   console.log(progressBar.offsetWidth)

   //yüzdelik olarak hesaplama yap
   let progress = (coordEnd - coordStart) / progressBar.offsetWidth
   console.log(progress)

   //progress i ilerlet
   currentProgress.style.Width = progress * 100 + "%"

   //sesin anlık suresini değiştir.
   audio.currentTime = progress * audio.duration

   audio.play()
   pauseButton.classList.remove('hide')
   playButton.classList.add('hide')
})


//zaman formatla
const timeFormatter = (timeInput) => {
   let minute = Math.floor(timeInput / 60)
   minute = minute < 10 ? "0" + minute : minute
   let second = Math.floor(timeInput % 60)
   second = second < 10 ? "0" + second : second
   return `${minute}:${second}`
}

const previousSong = () => {
   if (index > 0) {
      pauseAudio()
      index = index - 1
   } else {
      index = songsList.length - 1
   }
   setSong(index)
}

const nextSong = () => {
   if (loop) {
      if (index == (songsList.length - 1)) {
         index = 0
      } else {
         index = index + 1
      }
      setSong(index)
   } else {
      let randIndex = Math.floor(Math.random() * songsList.length)
      setSong(randIndex)
   }
}

//tekrar buttonuna tıklanıldığında
repeatButton.addEventListener('click', () => {
   if (repeatButton.classList.contains('active')) {
      repeatButton.classList.remove('active')
      audio.loop = false
   } else {
      repeatButton.classList.add('active')
      audio.loop = true
   }
})

//kariştirici tıklanıldığında
shuffleButton.addEventListener('click', () => {
   if (shuffleButton.classList.contains('active')) {
      shuffleButton.classList.remove('active')
      audio.loop = true
   } else {
      shuffleButton.classList.add('active')
      audio.loop = false
   }
})


// şarkı bittiğinde,
audio.onended = () => {
   nextSong() //sonraki şarkiyi cağır
}

playListButton.addEventListener('click' ,()=>{
   playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
   playListContainer.classList.add('hide')
})

// oynat butonuna tıklanıldığında
playButton.addEventListener('click', playAudio)

//durdur butonuna tıklanıldığında
pauseButton.addEventListener('click', pauseAudio)

// onceki tıklanirsa
prevButton.addEventListener('click', previousSong

)
//sonraki tıklanıldığında
nextButton.addEventListener('click', nextSong)

const initializePlaylist = () => {
   for (let i in songsList) {
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
       <span id="playlist-song-name">
        ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>
     `
   }
}



window.onload = () => {
   index = 0
   setSong(index)
   pauseAudio()
   initializePlaylist()
}