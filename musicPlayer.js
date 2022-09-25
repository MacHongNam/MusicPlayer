const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MACHONGNAM_PLAYER';

const playlist = $('.playlist');
const audio = $('#audio');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRanDom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: "Tình Ka Ngọt Ngào",
            singer: "Lập Nguyên, Yến Nồi Cơm Điện",
            path: "path\\tinh_ka_ngot_ngao_lap_nguyen_x_yen_noi_com_dien_prod_hoang_green_official_music_video_1080729690744131450.mp3",
            image: "https://i.ytimg.com/vi/Yr7FIIshNxo/maxresdefault.jpg"
        },
        {
            name: "Kẻ Điên Tin Vào Tình Yêu",
            singer: "Lil Zpoet",
            path: "path\\lil_z_poet_tu_lee_ke_dien_tin_vao_tinh_yeu_official_mv_-3848372313844272708.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/9/f/6/69f621e3a5655a7c984664e893af70ab.jpg"
        },
        {
            name: "Ghé Qua",
            singer: "Dick x PC x Tofu",
            path: "path\\ghe_qua_official_mv_dick_x_pc_x_tofu_-324374146616000855.mp3",
            image: "https://lyrics3s.com/wp-content/uploads/2021/10/loi-bai-hat-ghe-qua.jpeg"
        },
        {
            name: "Mặt Mộc",
            singer: "Phạm Nguyên Ngọc x VAnh x Ân Nhi",
            path: "path\\ma_t_mo_c_pha_m_nguyen_ngo_c_x_vanh_x_an_nhi_original_8973044905805497922.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/7/e/8/57e8551b2dae93bdcc8c8fcb1efa42d2.jpg"
        },
        {
            name: "Tình Yêu Khủng Long",
            singer: "@Fay Cute",
            path: "path\\ti_nh_yeu_khu_ng_long_fay_cute_official_official_music_video_chung_thanh_duy_2715712003767250495.mp3",
            image: "https://i.scdn.co/image/ab67616d0000b2738dec247b7456ead76e284063"
        },
        {
            name: "2AM",
            singer: "JustaTee feat Big Daddy",
            path: "path\\2am_justatee_feat_big_daddy_official_audio_-8582028439297247043.mp3",
            image: "https://i.scdn.co/image/ab67616d0000b27358c621ac04d82fd9338ac35c"
        },
        {
            name: "3 1 0 7",
            singer: "W/n ft. Nâu, Duong",
            path: "path\\3_1_0_7_w_n_duongg_nau_official_lyric_video_6280356179359249484.mp3",
            image: "https://i.pinimg.com/564x/5c/43/5f/5c435f0bcbcc40cebd52adf9106dd5ae.jpg"
        },
        {
            name: "3107 2",
            singer: "DuongG x Nâu x W/N",
            path: "path\\3107_2_duongg_x_na_u_x_w_n_official_mv_8206447241466940560.mp3",
            image: "https://i1.sndcdn.com/artworks-RT4HQUFACAIqfjyZ-Agd0Ng-t500x500.jpg"
        },
        {
            name: "Cứ Nói Yêu Lần Này (Cukak Remix)",
            singer: "Lil Zpoet",
            path: "path\\cu_noi_yeu_lan_nay_lil_zpoet_cukak_remix_audio_lyrics_video_7458520400517209117.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/05/11/4/e/e/8/1652277796135_640.jpg"
        },
        {
            name: "Buông Đôi Tay Nhau Ra",
            singer: "Sơn Tùng MTP",
            path: "path\\Buong-Doi-Tay-Nhau-Ra-Son-Tung-M-TP.mp3",
            image: "https://upload.wikimedia.org/wikipedia/vi/c/c0/Buongdoitaynhauramtp.jpg"
        },
        {
          name: "Thu Cuối",
          singer: "Mr T x Yanbi x Hằng Bingboong",
          path: "https://ytop1.com/Thankyou?token=U2FsdGVkX1%2fkp3dC4Vq%2fBrOlzGgaCagjUb7VBfNjRSM5i%2bLVCSHIzqodfM3lMrxMCnCaRB4pXe1Nj6C7nxcyjpMJT9Sp%2bR3SLLC1sIBTCOeNxtFOjvP%2fpKnfBptH0sS4Dc%2fcoDxY3fej35uSIiD%2blybwNgViTDmUjBjEuFNkYIkNq9NQ1d%2bB3vH%2b56lvTbme&s=youtube&id=&h=4326521932769265574",
          image: "https://i1.sndcdn.com/artworks-000528353961-lo0sor-t500x500.jpg"
        }
    ],

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    renderSong() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        playlist.innerHTML = htmls.join('\n');
    },

    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            },
        })
    },

    handleEvents() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        //Phong to thu nho cd khi cuon playlist
        document.onscroll = () => {
            const newWidth = cdWidth - scrollY;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth / cdWidth;
        };

        //Play, pause song
        playBtn.onclick = () => {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        //Khi song duoc play
        audio.onplay = () => {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        //Khi song bi pause
        audio.onpause = () => {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        //Khi tien do bai hat thay doi
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        };

        //Khi tua bai hat
        progress.onchange = () => {
            const seekTime =  Math.floor(progress.value * audio.duration /100);
            audio.currentTime = seekTime;
        };

        //Khi bam next
        nextBtn.onclick = () => {
            if (_this.isRanDom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.renderSong();
            _this.scrollToActiveSong();
        };

        //Khi bam prev
        prevBtn.onclick = () => {
            if (_this.isRanDom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.renderSong();
            _this.scrollToActiveSong();
        };

        //Khi bam random
        randomBtn.onclick = () => {
            _this.isRanDom = !_this.isRanDom;
            _this.setConfig('isRanDom', _this.isRanDom);
            randomBtn.classList.toggle('active', _this.isRanDom);
        };

        //Khi bam repeat
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        };
        
        //Khi het bai
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        //Khi bam vao playlist
        playlist.onclick = (e) => {
            const songNote = e.target.closest('.song:not(.active');
            const optionNote = e.target.closest('.option');
            if (songNote || optionNote) {
                if (songNote) {
                    _this.currentIndex = songNote.dataset.index;
                    _this.loadCurrentSong();
                    _this.renderSong();
                    audio.play();
                }
            }
        }
    },

    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 300);
    },

    loadConfig() {
        console.log(this.config.isRanDom);
        console.log(this.config.isRepeat);
        this.isRepeat = this.config.isRepeat;
        this.isRanDom = this.config.isRanDom;
        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRanDom);

    },

    loadCurrentSong() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
    },

    playRandomSong() {
        let newIndexSong;
        do {
            newIndexSong = Math.floor(Math.random() * this.songs.length);
        } while (newIndexSong == this.currentIndex);
        this.currentIndex = newIndexSong;
        this.loadCurrentSong();
    },

    start() {

        this.loadConfig();

        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties();

        //Tai thong tin bai hat dau tien vao UI khi chay app
        this.loadCurrentSong();

        //Lang nghe xa xu ly cac su kien
        this.handleEvents();

        //Render playList
        this.renderSong();
    }
}

app.start();