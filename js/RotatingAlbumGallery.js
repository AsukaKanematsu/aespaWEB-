const albums = document.querySelector('.album-container');
const images = [
    { id: 1, title: 'Black Mamba', year: '2020', image: 'images/black-mamba-cover.jpg' },
    { id: 2, title: 'Next Level', year: '2021', image: 'images/next-level-cover.jpg' },
    { id: 3, title: 'Savage', year: '2021', image: 'images/savage-cover.jpg' },
    { id: 4, title: 'Girls', year: '2022', image: 'images/girls-cover.jpg' },
    { id: 5, title: 'Dreams Come True', year: '2022', image: 'images/dream-cover.jpg' },
    { id: 6, title: 'Spicy', year: '2023', image: 'images/spicy-cover.jpg' },
    { id: 7, title: 'Drama', year: '2024', image: 'images/drama-cover.jpg' },
    { id: 8, title: 'Armageddon', year: '2024', image: 'images/Armageddon-cover.jpg' },
    { id: 9, title: 'Hot Mess', year: '2024', image: 'images/Hot-cover.jpg' },
    { id: 10, title: 'Whiplash', year: '2024', image: 'images/Whiplash-cover.jpg' }
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
        albums.appendChild(element);
        positionAlbum(element, index);
    });
}

function positionAlbum(element, index) {
    const angle = (index * (360 / images.length)) + rotationY;
    const rad = angle * Math.PI / 180;
    element.style.transform = `
        translate(-50%, -50%)
        rotateY(${angle}deg)
        translateZ(${radius}px)
    `;
    // 透明度の最小値を0.8に変更（0.4から）
    element.style.opacity = Math.max(0.8, 1 - Math.abs(((angle % 360) - 180) / 180));
}

function handleDragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
}

function handleDragMove(e) {
    if (!isDragging) return;

    const currentX = e.pageX || e.touches[0].pageX;
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

document.addEventListener('DOMContentLoaded', () => {
    createAlbums();

    albums.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    albums.addEventListener('touchstart', handleDragStart);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
});