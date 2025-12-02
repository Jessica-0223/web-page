// --- 題庫資料 (Deepfake Game Data) ---
// 請確保 'videos/' 路徑下的檔案是存在的
const questions = [
    {
        id: 1,
        real_video: 'videos/q1_real.mp4',
        fake_video: 'videos/q1_fake.mp4',
        explanation: '專業分析：請仔細觀察嘴唇邊緣，Deepfake 影片在高速動作時出現輕微的鋸齒狀偽影，這是生成模型常見的破綻。',
    },
    {
        id: 2,
        real_video: 'videos/q2_real.mp4',
        fake_video: 'videos/q2_fake.mp4',
        explanation: '專業分析：Deepfake 影片中的人物眼神接觸略微不自然，且臉部陰影處的顏色漸變不如真實影片平滑，有塊狀感。',
    }
    // 您可以繼續添加更多題目
];

let currentQuestionIndex = 0;
let score = 0;
let currentAnswer = ''; // 儲存當前題目的正確答案 ('left' 或 'right')

// --- DOM 元素選擇器 ---
const videoLeftBox = document.getElementById('video-left');
const videoRightBox = document.getElementById('video-right');
const videoLeftPlayer = videoLeftBox.querySelector('.video-player');
const videoRightPlayer = videoRightBox.querySelector('.video-player');
const questionTitle = document.getElementById('question-title');
const resultMessage = document.getElementById('result-message');
const explanationText = document.getElementById('explanation-text');
const nextBtn = document.getElementById('next-question-btn');

/**
 * 重置影片框、訊息和按鈕，準備下一題。
 */
function resetUI() {
    [videoLeftBox, videoRightBox].forEach(box => {
        // 清除所有邊框顏色
        box.classList.remove('correct', 'incorrect');
        // 重新啟用點擊事件
        box.style.pointerEvents = 'auto';
    });

    resultMessage.classList.add('hidden');
    explanationText.classList.add('hidden');
    nextBtn.classList.add('hidden');
}

/**
 * 隨機決定真假影片在左右的位置，並載入播放器。
 */
function loadQuestion(index) {
    // 1. 重置介面
    resetUI();
    
    // 2. 獲取當前題目數據
    const q = questions[index];
    if (!q) {
        // 所有題目答完，顯示結束訊息
        questionTitle.textContent = `遊戲結束！您的最終得分是 ${score}/${questions.length}。`;
        resultMessage.textContent = '恭喜您完成所有挑戰！';
        resultMessage.classList.remove('hidden');
        return; // 結束函數執行
    }
    
    // 3. 設置問題標題
    questionTitle.textContent = `Q${q.id}: 假影片是哪個？ (目前得分: ${score})`;

    // 4. 隨機決定位置
    const isFakeOnLeft = Math.random() < 0.5;
    
    const leftSrc = isFakeOnLeft ? q.fake_video : q.real_video;
    const rightSrc = isFakeOnLeft ? q.real_video : q.fake_video;
    
    // 設置正確答案 (假影片在哪一側)
    currentAnswer = isFakeOnLeft ? 'left' : 'right';

    // 5. 設置影片來源
    videoLeftPlayer.src = leftSrc;
    videoRightPlayer.src = rightSrc;
    
    // 6. 載入並開始播放 (確保影片循環播放，以便觀察)
    videoLeftPlayer.load();
    videoRightPlayer.load();
    
    // 由於瀏覽器自動播放限制，我們使用 Promise 或事件處理來確保播放
    videoLeftPlayer.play().catch(e => console.log("無法自動播放左側影片:", e));
    videoRightPlayer.play().catch(e => console.log("無法自動播放右側影片:", e));
}

/**
 * 處理使用者點擊影片的事件。
 * @param {HTMLElement} clickedBox - 被點擊的影片容器。
 */
function handleChoice(clickedBox) {
    // 1. 禁用進一步的點擊
    [videoLeftBox, videoRightBox].forEach(box => {
        box.style.pointerEvents = 'none';
    });
    
    // 2. 找出真/假影片的元素
    const userChoice = clickedBox.dataset.choice;
    const isCorrect = userChoice === currentAnswer;
    const correctBox = currentAnswer === 'left' ? videoLeftBox : videoRightBox;
    
    // 3. 判斷並給予視覺回饋
    if (isCorrect) {
        // 答對了
        score++; // 增加分數
        clickedBox.classList.add('correct');
        resultMessage.textContent = '✅ 答對了！您成功辨識出 Deepfake 影片！';
        resultMessage.style.color = '#4caf50';
    } else {
        // 答錯了
        clickedBox.classList.add('incorrect');
        correctBox.classList.add('correct'); // 標示出正確的假影片
        resultMessage.textContent = '❌ 答錯了。這是真實影片。';
        resultMessage.style.color = '#f44336';
    }
    
    // 4. 顯示專業解釋
    explanationText.textContent = questions[currentQuestionIndex].explanation;
    
    // 5. 顯示結果和下一題按鈕
    resultMessage.classList.remove('hidden');
    explanationText.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

/**
 * 初始化遊戲和事件監聽器。
 */
function initGame() {
    // 綁定點擊事件到兩個影片框
    videoLeftBox.addEventListener('click', () => handleChoice(videoLeftBox));
    videoRightBox.addEventListener('click', () => handleChoice(videoRightBox));
    
    // 綁定「下一題」按鈕事件
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    });
    
    // 啟動第一道題目
    loadQuestion(currentQuestionIndex);
}

// 啟動遊戲
document.addEventListener('DOMContentLoaded', initGame);