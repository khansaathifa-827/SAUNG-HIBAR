document.addEventListener('DOMContentLoaded', () => {

    const chatConversation = document.getElementById('chatConversation');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const adminButton = document.getElementById('adminButton');
    const backButton = document.getElementById('backButton');


    // =====================================================
    // DATA BALASAN CHATBOT
    // =====================================================

    const botResponses = {

        harga: {
            question: 'Harga',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <ol class="sh-chatbot__price-list">
                        <li>HTM Camping: 50.000/orang</li>
                        <li>HTM Kolam Renang: 25.000/orang</li>
                        <li>Parkir: mobil 10.000, motor 5.000</li>
                        <li>Kamar + akses Kolam Renang (3 orang): 350.000</li>
                        <li>Penginapan kapasitas 10 orang: 1.500.000</li>
                        <li>Tenda menginap: 250.000-500.000</li>
                        <li>Tenda tanpa menginap (maks. 8 jam): 150.000</li>
                        <li>Extra Bed: 100.000/orang</li>
                    </ol>

                </div>
            `
        },


        operasional: {
            question: 'Jam Operasional',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Jam Operasional
                    </p>

                    <div class="sh-chatbot__menu-item">
                        <span>Senin - Jumat</span>
                        <span>09.00 - 21.00</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Sabtu - Minggu</span>
                        <span>08.00 - 22.00</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Libur Nasional</span>
                        <span>08.00 - 22.00</span>
                    </div>

                </div>
            `
        },


        fasilitas: {
            question: 'Fasilitas',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Fasilitas Saung Hibar
                    </p>

                    <ul>
                        <li>Restoran</li>
                        <li>Kolam renang</li>
                        <li>Camping ground</li>
                        <li>Penginapan dan villa</li>
                    </ul>

                </div>
            `
        },


        lokasi: {
            question: 'Lokasi',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Lokasi Saung Hibar
                    </p>

                    <p>
                        Saung Hibar berada di Pasir Muncang,
                        Kecamatan Wanayasa, Kabupaten Purwakarta,
                        Jawa Barat.
                    </p>

                </div>
            `
        },


        menu: {
            question: 'Menu',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Menu :
                    </p>

                    <div class="sh-chatbot__menu-item">
                        <span>Ikan Bakar</span>
                        <span>Rp30.000</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Ayam Goreng</span>
                        <span>Rp20.000</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Nasi</span>
                        <span>Rp5.000</span>
                    </div>

                    <button
                        type="button"
                        class="sh-chatbot__menu-button-full"
                        id="lihatMenuLengkap"
                    >
                        Lihat Menu Lengkap
                    </button>

                </div>
            `
        },


        booking: {
            question: 'Cara Booking',

            answer: `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Cara Booking
                    </p>

                    <p>
                        Untuk melakukan booking, silakan hubungi
                        Admin Saung Hibar melalui WhatsApp.
                    </p>

                </div>
            `
        }

    };


    // =====================================================
    // MEMBUAT PESAN
    // =====================================================

    function appendMessage(type, content) {

        const messageRow = document.createElement('div');

        messageRow.className =
            `sh-chatbot__message-row sh-chatbot__message-row--${type}`;


        // ---------------- BOT MESSAGE ----------------

        if (type === 'bot') {

            const avatar = document.createElement('div');

            avatar.className =
                'sh-chatbot__avatar sh-chatbot__avatar--bot';

            const image = document.createElement('img');

            image.src = 'assets/images/logo.png';
            image.alt = 'Asisten Saung Hibar';

            avatar.appendChild(image);


            const group = document.createElement('div');

            group.className =
                'sh-chatbot__message-group';


            const bubble = document.createElement('div');

            bubble.className =
                'sh-chatbot__bubble sh-chatbot__bubble--bot';

            bubble.innerHTML = content;


            group.appendChild(bubble);

            messageRow.appendChild(avatar);
            messageRow.appendChild(group);

        }


        // ---------------- USER MESSAGE ----------------

        else {

            const group = document.createElement('div');

            group.className =
                'sh-chatbot__message-group';


            const bubble = document.createElement('div');

            bubble.className =
                'sh-chatbot__bubble sh-chatbot__bubble--user';

            // Pesan user ditampilkan sebagai teks biasa
            bubble.textContent = content;


            group.appendChild(bubble);

            messageRow.appendChild(group);

        }


        chatConversation.appendChild(messageRow);

    }


    // =====================================================
    // QUICK QUESTIONS
    // =====================================================

    function appendQuickQuestions() {

        const quickQuestions = document.createElement('div');

        quickQuestions.className =
            'sh-chatbot__quick-questions';


        const questions = [
            ['Harga', 'harga'],
            ['Jam Operasional', 'operasional'],
            ['Fasilitas', 'fasilitas'],
            ['Lokasi', 'lokasi'],
            ['Menu', 'menu'],
            ['Cara Booking', 'booking']
        ];


        questions.forEach(([label, value]) => {

            const button = document.createElement('button');

            button.type = 'button';

            button.className =
                'sh-chatbot__quick-button';

            button.dataset.question = value;

            button.textContent = label;

            quickQuestions.appendChild(button);

        });


        chatConversation.appendChild(quickQuestions);

    }


    // =====================================================
    // MEMPROSES PERTANYAAN
    // =====================================================

    function handleOptionClick(question) {

        const response = botResponses[question];

        if (!response) return;


        appendMessage(
            'user',
            `Saya ingin tahu ${response.question.toLowerCase()} di Saung Hibar`
        );


        setTimeout(() => {

            appendMessage('bot', response.answer);

            appendQuickQuestions();

            scrollToBottom();

        }, 400);


        scrollToBottom();

    }


    // =====================================================
    // EVENT QUICK QUESTION
    // =====================================================

    chatConversation.addEventListener('click', (event) => {

        const questionButton =
            event.target.closest('.sh-chatbot__quick-button');

        if (questionButton) {

            const question =
                questionButton.dataset.question;

            handleOptionClick(question);

        }

    });


    // =====================================================
    // TOMBOL LIHAT MENU LENGKAP
    // =====================================================

    chatConversation.addEventListener('click', (event) => {

        const menuButton =
            event.target.closest('#lihatMenuLengkap');

        if (!menuButton) return;


        appendMessage(
            'user',
            'Saya ingin melihat menu lengkap'
        );


        setTimeout(() => {

            appendMessage('bot', `
                <div class="sh-chatbot__menu-content">

                    <p class="sh-chatbot__menu-title">
                        Menu Saung Hibar
                    </p>

                    <div class="sh-chatbot__menu-item">
                        <span>Ikan Bakar</span>
                        <span>Rp30.000</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Ayam Goreng</span>
                        <span>Rp20.000</span>
                    </div>

                    <div class="sh-chatbot__menu-item">
                        <span>Nasi</span>
                        <span>Rp5.000</span>
                    </div>

                    <p style="margin-top:12px">
                        Untuk informasi menu lainnya, silakan
                        hubungi Admin Saung Hibar.
                    </p>

                </div>
            `);


            appendQuickQuestions();

            scrollToBottom();

        }, 400);

    });


    // =====================================================
    // INPUT PESAN
    // =====================================================

    function sendMessage() {

        const text = chatInput.value.trim();

        if (text === '') return;


        appendMessage('user', text);

        chatInput.value = '';


        setTimeout(() => {

            const lowerText = text.toLowerCase();

            let matchedQuestion = null;


            // Pencocokan kata kunci
            const keywords = {
                harga: ['harga', 'biaya', 'tarif', 'htm'],
                operasional: ['operasional', 'jam buka', 'jam tutup'],
                fasilitas: ['fasilitas', 'kolam', 'villa', 'camping'],
                lokasi: ['lokasi', 'alamat', 'dimana', 'di mana'],
                menu: ['menu', 'makanan', 'minuman'],
                booking: ['booking', 'reservasi', 'pesan villa']
            };


            for (const key in keywords) {

                const found = keywords[key].some(keyword =>
                    lowerText.includes(keyword)
                );

                if (found) {

                    matchedQuestion = key;

                    break;

                }

            }


            // Jika pertanyaan cocok
            if (matchedQuestion) {

                appendMessage(
                    'bot',
                    botResponses[matchedQuestion].answer
                );

            }


            // Jika pertanyaan tidak cocok
            else {

                appendMessage(
                    'bot',
                    `
                    <p>
                        Maaf, saya belum memahami pertanyaan tersebut.
                        Silakan pilih pertanyaan yang tersedia
                        atau hubungi Admin Saung Hibar.
                    </p>
                    `
                );

            }


            appendQuickQuestions();

            scrollToBottom();

        }, 400);

    }


    // Tombol kirim
    sendButton.addEventListener('click', sendMessage);


    // Kirim dengan Enter
    chatInput.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {

            event.preventDefault();

            sendMessage();

        }

    });


    // =====================================================
    // HUBUNGI ADMIN WHATSAPP
    // =====================================================

    adminButton.addEventListener('click', () => {

        // GANTI nomor berikut dengan nomor WhatsApp admin
        const nomorAdmin = '6281234567890';

        const pesan =
            'Halo Admin Saung Hibar, saya ingin bertanya mengenai informasi Saung Hibar.';

        const url =
            `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

        window.open(url, '_blank');

    });


    // =====================================================
    // TOMBOL KEMBALI
    // =====================================================

    backButton.addEventListener('click', () => {

        if (window.history.length > 1) {

            window.history.back();

        } else {

            // Jika halaman dibuka langsung
            window.location.href = '../';

        }

    });


    // =====================================================
    // SCROLL KE PESAN TERBARU
    // =====================================================

    function scrollToBottom() {

        chatConversation.scrollTop =
            chatConversation.scrollHeight;

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

    }

});