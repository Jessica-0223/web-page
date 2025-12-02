// ========================================
// 共用功能：漢堡選單
// ========================================
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

if (hamburger && sideMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = sideMenu.classList.contains('open');
    
    if (isOpen) {
      sideMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      sideMenu.setAttribute('aria-hidden', 'true');
    } else {
      sideMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      sideMenu.setAttribute('aria-hidden', 'false');
    }
  });

  // 點擊選單外部關閉
  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
      sideMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      sideMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// ========================================
// 首頁專用：影片辨識功能
// ========================================
if (document.getElementById('analyzeForm')) {
  const API_ENDPOINT = '/api/analyze-video';
  const form = document.getElementById('analyzeForm');
  const submitBtn = document.getElementById('submitBtn');
  const videoUrlInput = document.getElementById('videoUrl');
  const fileInput = document.getElementById('fileInput');
  const resultSection = document.getElementById('result');
  const resultSummary = document.getElementById('resultSummary');
  const resultDetails = document.getElementById('resultDetails');
  const reportBtn = document.getElementById('reportBtn');
  const playBtn = document.getElementById('playBtn');

  // 表單提交處理
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const videoUrl = videoUrlInput.value.trim();
    const file = fileInput.files[0];

    if (!videoUrl && !file) {
      return;
    }

    // 顯示載入狀態
    submitBtn.disabled = true;
    submitBtn.textContent = '分析中...';
    resultSection.classList.add('hidden');

    try {
      // 模擬 API 呼叫（實際使用時需要連接後端）
      await simulateAnalysis(videoUrl || file.name);
      
      // 顯示結果
      displayResult({
        isFake: Math.random() > 0.5,
        confidence: (Math.random() * 30 + 70).toFixed(1),
        reasons: [
          '臉部邊緣存在不自然的模糊現象',
          '眨眼頻率異常，不符合正常人類行為模式',
          '光影變化與背景不一致',
          '音訊與嘴型同步存在延遲'
        ]
      });
    } catch (error) {
      console.error('分析失敗：' + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '送出';
    }
  });

  // 模擬分析過程
  function simulateAnalysis(source) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  // 顯示辨識結果
  function displayResult(data) {
    const { isFake, confidence, reasons } = data;
    
    resultSummary.innerHTML = `
      <div class="p-4 rounded ${isFake ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'}">
        <p class="font-bold text-lg ${isFake ? 'text-red-700' : 'text-green-700'}">
          ${isFake ? '⚠️ 疑似假影片' : '✓ 可能是真實影片'}
        </p>
        <p class="text-sm mt-1">信心度：${confidence}%</p>
      </div>
    `;

    resultDetails.innerHTML = `
      <h4 class="font-bold">分析細節：</h4>
      <ul class="list-disc list-inside space-y-1">
        ${reasons.map(reason => `<li>${reason}</li>`).join('')}
      </ul>
      <p class="mt-3 text-xs text-slate-500">
        * 此結果僅供參考，建議結合多方資訊進行判斷
      </p>
    `;

    resultSection.classList.remove('hidden');
  }

  // 回報按鈕
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      console.log('檢舉功能開發中，感謝您的協助！');
    });
  }

  // 播放按鈕
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      console.log('播放功能開發中');
    });
  }

  // 檔案上傳時清空網址輸入
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      videoUrlInput.value = '';
    }
  });

  // 網址輸入時清空檔案上傳
  videoUrlInput.addEventListener('input', () => {
    if (videoUrlInput.value.trim()) {
      fileInput.value = '';
    }
  });
}

// ========================================
// 遊戲頁面專用：分辨小遊戲功能
// ========================================
if (document.getElementById('gameArea')) {
  let score = 0;
  let total = 0;
  const scoreEl = document.getElementById('score');
  const totalEl = document.getElementById('total');
  const progressBar = document.getElementById('progressBar');

  // 模擬遊戲邏輯（實際使用時需要載入真實影片）
  const gameButtons = document.querySelectorAll('#gameArea button');
  
  gameButtons.forEach(button => {
    button.addEventListener('click', () => {
      total++;
      const isCorrect = Math.random() > 0.5;
      
      if (isCorrect) {
        score++;
      } else {
      }
      
      updateScore();
    });
  });

  function updateScore() {
    scoreEl.textContent = score;
    totalEl.textContent = total;
    
    if (total > 0) {
      const percentage = (score / total) * 100;
      progressBar.style.width = percentage + '%';
    }
  }
}

// ========================================
// 論壇頁面專用：討論功能
// ========================================
if (window.location.pathname.includes('forum.html')) {
  const discussionCards = document.querySelectorAll('.glass.p-4.rounded-lg.hover\\:shadow-md');
  
  discussionCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      notify('討論詳情頁面開發中');
    });
  });
}

// ========================================
// 製作頁面專用：假影片製作功能
// ========================================
if (window.location.pathname.includes('create.html')) {
  const createBtn = document.querySelector('.pill');
  
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      console.log('製作功能開發中 — 僅供教學用途，請勿用於不法用途。');
    });
  }
}

