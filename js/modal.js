// メンバープロフィールデータ
const memberProfiles = {
    KARINA: {
        name: 'KARINA',
        fullImage: 'images/IMG_karina.jpeg',
        description: 'aespaのリーダー。2000年4月11日生まれ。',
        details: {
            birthPlace: '韓国',
            height: '168cm',
            position: 'リーダー、メインダンサー、リードボーカル'
        }
    },
    GISELLE: {
        name: 'GISELLE',
        fullImage: 'images/IMG_giselle.jpeg',
        description: '2000年10月30日生まれ。日本人メンバー。',
        details: {
            birthPlace: '日本',
            height: '164cm',
            position: 'メインラッパー、サブボーカル'
        }
    },
    WINTER: {
        name: 'WINTER',
        fullImage: 'images/IMG_winter.jpeg',
        description: '2001年1月1日生まれ。',
        details: {
            birthPlace: '韓国',
            height: '166cm',
            position: 'リードダンサー、リードボーカル'
        }
    },
    NINGNING: {
        name: 'NINGNING',
        fullImage: 'images/IMG_ningning.jpeg',
        description: '2002年10月23日生まれ。中国出身。',
        details: {
            birthPlace: '中国',
            height: '163cm',
            position: 'メインボーカル'
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('profileModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const closeButton = document.querySelector('.modal-close');

    // メンバープロフィールクリックイベント
    document.querySelectorAll('.hover-effect').forEach(element => {
        element.addEventListener('click', function() {
            const member = this.getAttribute('data-member');
            const profile = memberProfiles[member];
            
            if (profile) {
                modalImage.src = profile.fullImage;
                modalImage.alt = profile.name;
                modalName.textContent = profile.name;
                modalDescription.textContent = profile.description;
                
                // 詳細情報の構築
                modalDetails.innerHTML = Object.entries(profile.details)
                    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
                    .join('');
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // スクロール防止
            }
        });
    });

    // モーダルを閉じる
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // モーダル外クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});