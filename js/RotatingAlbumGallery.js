let currentPlayer = null;
let currentPlayingAlbum = null;

const albums = document.querySelector('.album-container');
const images = [
    { 
        id: 1, 
        title: 'Black Mamba', 
        year: '2020', 
        image: 'images/black-mamba-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/BL-aIpCLWnU?si=Zq95Kq1F5wSyRM6S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 2, 
        title: 'Next Level', 
        year: '2021', 
        image: 'images/next-level-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/tkzYyEp4zB4?si=YxlN1zByG5K8BSz1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 3, 
        title: 'Savage', 
        year: '2021', 
        image: 'images/savage-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/8_4Debx0YlQ?si=A31FjkWWnNFVDpyO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 4, 
        title: 'Girls', 
        year: '2022', 
        image: 'images/girls-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/MBbqqWqLPlI?si=6-vuMqMUc4N1-jBf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 5, 
        title: 'Dreams Come True', 
        year: '2022', 
        image: 'images/dream-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/S3Z6N7U7f6I?si=ttZAyt_t2KzV1Qp0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 6, 
        title: 'Spicy', 
        year: '2023', 
        image: 'images/spicy-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/xUV9pcwhY0U?si=rwqCOqcsu1H_HXkV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 7, 
        title: 'Drama', 
        year: '2024', 
        image: 'images/drama-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/S3Z6N7U7f6I?si=iQW4g6D5SPQnPImF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 8, 
        title: 'Armageddon', 
        year: '2024', 
        image: 'images/Armageddon-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/BfI89YxNzVY?si=rVvbvHftY4QnoYFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 9, 
        title: 'Hot Mess', 
        year: '2024', 
        image: 'images/Hot-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/YSEwEFuMPPM?si=065UA_6SOr-sykty" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { 
        id: 10, 
        title: 'Whiplash', 
        year: '2024', 
        image: 'images/Whiplash-cover.jpg',
        embedCode: `<iframe width="560" height="315" src="https://youtu.be/7Jan-2W-IdY?si=NIv6Z_WX2h4Ogq5e" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }
];


let isDragging = false;
let startX;
let rotationY = 0;
const radius = 300;

function createAlbums() {
    images.forEach((album, index) => {
        const element = document.createElement('div');
        element.className = 'album-item';
        element.innerHTML = `
            <div class="album-content">
                <img src="${album.image}" alt="${album.title}" class="album-img">
                <div class="album-info">
                    <h3>${album.title}</h3>
                    <p>${album.year}</p>
                </div>
            </div>
        `;

        // クリックイベントを追加
        let isDragged = false;
        element.addEventListener('mousedown', () => {
            isDragged = false;
        });
        element.addEventListener('mousemove', () => {
            isDragged = true;
        });
        element.addEventListener('mouseup', () => {
            if (!isDragged) {
                playAlbumAudio(album, element);
            }
        });

        albums.appendChild(element);
        positionAlbum(element, index);
    });

    // プレイヤーコンテナを追加
    const playerContainer = document.createElement('div');
    playerContainer.className = 'album-player';
    playerContainer.innerHTML = `
        <span class="close-player">&times;</span>
        <div class="player-content"></div>
    `;
    document.body.appendChild(playerContainer);

    // 閉じるボタンのイベント
    const closePlayer = playerContainer.querySelector('.close-player');
    closePlayer.addEventListener('click', () => {
        playerContainer.style.display = 'none';
        if (currentPlayingAlbum) {
            currentPlayingAlbum.classList.remove('playing');
        }
    });
}

function positionAlbum(element, index) {
    const angle = (index * (360 / images.length)) + rotationY;
    element.style.transform = `
        translate(-50%, -50%)
        rotateY(${angle}deg)
        translateZ(${radius}px)
    `;
    element.style.opacity = Math.max(0.8, 1 - Math.abs(((angle % 360) - 180) / 180));
}

function handleDragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches?.[0].pageX;
}

function handleDragMove(e) {
    if (!isDragging) return;

    const currentX = e.pageX || e.touches?.[0].pageX;
    if (!currentX) return;
    
    const delta = currentX - startX;
    rotationY += delta * 0.5;

    Array.from(albums.children).forEach((element, index) => {
        positionAlbum(element, index);
    });

    startX = currentX;
}

function handleDragEnd() {
    isDragging = false;
}

function rotateGallery(direction) {
    const rotationAmount = direction === 'left' ? 36 : -36;
    rotationY += rotationAmount;
    
    Array.from(albums.children).forEach((element, index) => {
        positionAlbum(element, index);
    });
}

function playAlbumAudio(album, element) {
    if (currentPlayingAlbum) {
        currentPlayingAlbum.classList.remove('playing');
        const existingPlayer = document.querySelector('.album-player iframe');
        if (existingPlayer) {
            existingPlayer.remove();
        }
    }

    element.classList.add('playing');
    currentPlayingAlbum = element;

    const playerContainer = document.querySelector('.album-player');
    const playerContent = playerContainer.querySelector('.player-content');

    console.log('Playing album:', album.title);
    console.log("YouTube URL:", album.embedCode);

    // YouTube URL からビデオ ID を取得
    const videoId = extractVideoId(album.embedCode);
    
    if (!videoId) {
        console.error('Could not extract video ID for:', album.title);
        return;
    }

    // **🔧 修正: autoplay がブロックされないように allowlist を拡張**
    playerContent.innerHTML = `
        <iframe width="1" height="1"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&modestbranding=1"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            style="display: none;">
        </iframe>
    `;

    playerContainer.style.display = 'none'; // プレイヤーのコンテナも非表示
}




// YouTube URLからビデオIDを抽出する関数
function extractVideoId(embedCode) {
    // YouTube動画IDを取得する正規表現
    const regex = /(?:embed\/|v=|youtu\.be\/|\/)([\w-]{11})/;
    const match = embedCode.match(regex);
    return match ? match[1] : null;
}



document.addEventListener('DOMContentLoaded', () => {
    createAlbums();

    // ドラッグ制御
    albums.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    albums.addEventListener('touchstart', handleDragStart);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);

    // 矢印ボタン制御
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => rotateGallery('left'));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => rotateGallery('right'));
    }

    // キーボード制御
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            rotateGallery('left');
        } else if (e.key === 'ArrowRight') {
            rotateGallery('right');
        }
    });
});