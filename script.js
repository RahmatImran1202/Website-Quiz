// Data soal kuis (20 soal pengetahuan umum)
const allQuestions = [
    {
        question: "Ibu kota Indonesia adalah?",
        answers: ["Bandung", "Jakarta", "Surabaya", "Medan"],
        correct: 1
    },
    {
        question: "Planet terdekat dengan matahari adalah?",
        answers: ["Venus", "Mars", "Merkurius", "Bumi"],
        correct: 2
    },
    {
        question: "Berapa jumlah provinsi di Indonesia?",
        answers: ["34", "35", "38", "33"],
        correct: 2
    },
    {
        question: "Benua terbesar di dunia adalah?",
        answers: ["Afrika", "Amerika", "Asia", "Eropa"],
        correct: 2
    },
    {
        question: "Hewan terbesar di dunia adalah?",
        answers: ["Gajah", "Paus Biru", "Jerapah", "Hiu"],
        correct: 1
    },
    {
        question: "Warna bendera Indonesia adalah?",
        answers: ["Merah dan Putih", "Merah dan Kuning", "Biru dan Putih", "Hijau dan Putih"],
        correct: 0
    },
    {
        question: "Indonesia merdeka pada tahun?",
        answers: ["1944", "1945", "1946", "1947"],
        correct: 1
    },
    {
        question: "Satu hari ada berapa jam?",
        answers: ["12 jam", "24 jam", "48 jam", "36 jam"],
        correct: 1
    },
    {
        question: "Gunung tertinggi di Indonesia adalah?",
        answers: ["Gunung Merapi", "Gunung Semeru", "Gunung Bromo", "Puncak Jaya"],
        correct: 3
    },
    {
        question: "Satu tahun ada berapa bulan?",
        answers: ["10 bulan", "11 bulan", "12 bulan", "13 bulan"],
        correct: 2
    },
    {
        question: "Pulau terbesar di Indonesia adalah?",
        answers: ["Jawa", "Sumatra", "Kalimantan", "Papua"],
        correct: 3
    },
    {
        question: "Presiden pertama Indonesia adalah?",
        answers: ["Soeharto", "Soekarno", "Habibie", "Megawati"],
        correct: 1
    },
    {
        question: "Jumlah pemain sepak bola dalam satu tim adalah?",
        answers: ["9 orang", "10 orang", "11 orang", "12 orang"],
        correct: 2
    },
    {
        question: "Negara yang menjadi tuan rumah Piala Dunia 2022 adalah?",
        answers: ["Brazil", "Qatar", "Rusia", "Jerman"],
        correct: 1
    },
    {
        question: "Hari Kemerdekaan Indonesia diperingati setiap tanggal?",
        answers: ["1 Juni", "17 Agustus", "10 November", "28 Oktober"],
        correct: 1
    },
    {
        question: "Air mendidih pada suhu?",
        answers: ["50°C", "75°C", "100°C", "150°C"],
        correct: 2
    },
    {
        question: "Alat musik tradisional dari Jawa Barat adalah?",
        answers: ["Angklung", "Sasando", "Kolintang", "Gamelan"],
        correct: 0
    },
    {
        question: "Raja hutan adalah sebutan untuk?",
        answers: ["Harimau", "Singa", "Beruang", "Serigala"],
        correct: 1
    },
    {
        question: "Negara dengan jumlah penduduk terbanyak di dunia adalah?",
        answers: ["India", "Amerika Serikat", "Indonesia", "China"],
        correct: 3
    },
    {
        question: "Mata uang Indonesia adalah?",
        answers: ["Ringgit", "Rupiah", "Baht", "Peso"],
        correct: 1
    }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userName = '';
let modalInstance = null;

/**
 * Fungsi untuk mendapatkan 10 soal random dari 20 soal
 * @returns {Array} Array berisi 10 soal random
 */
function getRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

/**
 * Fungsi untuk validasi form nama
 * @param {Event} event - Event submit form
 */
function validateNameForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const nameInput = document.getElementById('userName');
    
    if (nameInput.value.trim().length < 3) {
        nameInput.classList.add('is-invalid');
        return;
    }
    
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
    userName = nameInput.value.trim();
    
    showConfirmModal();
}

/**
 * Fungsi untuk menampilkan modal konfirmasi
 */
function showConfirmModal() {
    const modalElement = document.getElementById('confirmModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = `Halo ${userName}, apakah Anda siap memulai kuis?`;
    
    modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
}

/**
 * Fungsi untuk memulai kuis setelah konfirmasi
 */
function confirmStartQuiz() {
    if (modalInstance) {
        modalInstance.hide();
    }
    
    document.getElementById('userNameDisplay').textContent = userName;
    questions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    showScreen('quizScreen');
    displayQuestion();
}

/**
 * Fungsi untuk menampilkan pertanyaan
 */
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    document.getElementById('progressFill').style.width = progressPercent + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    for (let i = 0; i < question.answers.length; i++) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12';
        
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = question.answers[i];
        button.dataset.index = i;
        
        colDiv.appendChild(button);
        answersContainer.appendChild(colDiv);
    }
    
    document.getElementById('nextBtn').disabled = true;
    selectedAnswer = null;
}

/**
 * Fungsi untuk memilih jawaban
 * @param {Event} event - Event click pada button jawaban
 */
function selectAnswer(event) {
    if (!event.target.classList.contains('answer-btn')) return;
    if (selectedAnswer !== null) return;
    
    const index = parseInt(event.target.dataset.index);
    selectedAnswer = index;
    
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        
        if (i === question.correct) {
            buttons[i].classList.add('correct');
        } else if (i === selectedAnswer && i !== question.correct) {
            buttons[i].classList.add('wrong');
        }
    }
    
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    document.getElementById('nextBtn').disabled = false;
}

/**
 * Fungsi untuk ke pertanyaan berikutnya atau menampilkan hasil
 */
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

/**
 * Fungsi untuk menampilkan hasil kuis
 */
function showResult() {
    showScreen('resultScreen');
    document.getElementById('finalScore').textContent = score;
    
    let message = '';
    let alertType = '';
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
        message = 'Sempurna! Anda menguasai materi!';
        alertType = 'success';
    } else if (percentage >= 80) {
        message = 'Hebat! Hasil yang sangat baik!';
        alertType = 'success';
    } else if (percentage >= 60) {
        message = 'Bagus! Terus tingkatkan!';
        alertType = 'info';
    } else if (percentage >= 40) {
        message = 'Cukup baik, perlu belajar lagi!';
        alertType = 'warning';
    } else {
        message = 'Perlu lebih banyak latihan!';
        alertType = 'danger';
    }
    
    document.getElementById('scoreMessage').textContent = message;
    
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${alertType} mb-3" role="alert">
            ${userName}, skor Anda: ${score} dari ${questions.length} (${percentage.toFixed(0)}%)
        </div>
    `;
}

/**
 * Fungsi untuk mengulang kuis
 */
function restartQuiz() {
    showScreen('welcomeScreen');
    document.getElementById('userName').value = '';
    document.getElementById('userName').classList.remove('is-valid');
    document.getElementById('userNameDisplay').textContent = '';
}

/**
 * Fungsi untuk menampilkan screen tertentu
 * @param {string} screenId - ID screen yang akan ditampilkan
 */
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
    }
    document.getElementById(screenId).classList.add('active');
}

/**
 * Fungsi untuk validasi input nama saat mengetik
 * @param {Event} event - Event input
 */
function validateNameInput(event) {
    const input = event.target;
    if (input.value.trim().length >= 3) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else if (input.value.trim().length > 0) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.remove('is-invalid', 'is-valid');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Event 1: Submit form nama
    const nameForm = document.getElementById('nameForm');
    nameForm.addEventListener('submit', validateNameForm);
    
    // Event 2: Input validasi nama
    const nameInput = document.getElementById('userName');
    nameInput.addEventListener('input', validateNameInput);
    
    // Event 3: Click jawaban (event delegation)
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.addEventListener('click', selectAnswer);
    
    // Event 4: Click button next
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', nextQuestion);
    
    // Event 5: Click button restart
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartQuiz);
    
    // Event 6: Konfirmasi modal
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.addEventListener('click', confirmStartQuiz);
});
