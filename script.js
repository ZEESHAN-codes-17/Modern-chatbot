      const conversationArea = document.getElementById('conversationArea');
        const chatInput = document.getElementById('chatInput');
        const typingIndicator = document.getElementById('typingIndicator');

        const tourData = {
            summer: { price: 12, season: 'Summer', emoji: '☀️' },
            spring: { price: 50, season: 'Spring', emoji: '🌸' },
            winter: { price: 70, season: 'Winter', emoji: '❄️' },
            autumn: { price: 30, season: 'Autumn', emoji: '🍂' },
            fall: { price: 30, season: 'Autumn', emoji: '🍂' }
        };

        const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        const thankYou = ['thanks', 'thank you', 'appreciate', 'thx'];

        function startConversation() {
            conversationArea.classList.add('active');
            conversationArea.scrollIntoView({ behavior: 'smooth' });
            addBotMessage("Hello! I'm your travel advisor. How can I help you today?");
        }

        function addUserMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'user-message';
            messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
            conversationArea.insertBefore(messageDiv, typingIndicator);
            conversationArea.scrollTop = conversationArea.scrollHeight;
        }

        function addBotMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'bot-message';
            messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
            conversationArea.insertBefore(messageDiv, typingIndicator);
            conversationArea.scrollTop = conversationArea.scrollHeight;
        }

        function showTyping() {
            typingIndicator.style.display = 'block';
            conversationArea.scrollTop = conversationArea.scrollHeight;
        }

        function hideTyping() {
            typingIndicator.style.display = 'none';
        }

        function getBotResponse(userMessage) {
            const msg = userMessage.toLowerCase().trim();

            if (greetings.some(greeting => msg.includes(greeting))) {
                const responses = [
                    "Hello! How can I assist you with your travel plans?",
                    "Hi there! Ready to explore our seasonal tours?",
                    "Hey! What destination are you dreaming of?"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            if (thankYou.some(thanks => msg.includes(thanks))) {
                return "You're welcome! Feel free to ask anything else about our tours.";
            }

            for (let season in tourData) {
                if (msg.includes(season)) {
                    const tour = tourData[season];
                    return `${tour.emoji} Our ${tour.season} tour is priced at $${tour.price}! For more details about activities and booking, kindly check our website.`;
                }
            }

            if (msg.includes('price') || msg.includes('cost') || msg.includes('all') || msg.includes('tour')) {
                return "Here are our seasonal tour packages:\n\n☀️ Summer - $12\n🌸 Spring - $50\n🍂 Autumn - $30\n❄️ Winter - $70\n\nWhich season interests you? For detailed information, please visit our website.";
            }

            if (msg.includes('best') || msg.includes('recommend') || msg.includes('suggest')) {
                return "The best tour depends on your budget and preferences!\n\n💰 Budget-friendly: Summer at $12\n⭐ Premium: Winter at $70\n🎯 Mid-range: Spring ($50) or Autumn ($30)\n\nWhat's your preference?";
            }

            if (msg.includes('website') || msg.includes('book')) {
                return "For booking and detailed tour information, please visit our website. I can help answer any questions you have about our packages!";
            }

            if (msg.includes('bye') || msg.includes('goodbye')) {
                return "Goodbye! Have an amazing journey! Come back anytime you need travel advice. ✈️";
            }

            return "I'd love to help! I can provide information about our seasonal tour prices or direct you to our website for booking. What would you like to know?";
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message === '') return;

            if (!conversationArea.classList.contains('active')) {
                startConversation();
            }

            addUserMessage(message);
            chatInput.value = '';

            showTyping();

            setTimeout(() => {
                hideTyping();
                const response = getBotResponse(message);
                addBotMessage(response);
            }, 1500);
        }

        function sendPredefined(message) {
            if (!conversationArea.classList.contains('active')) {
                startConversation();
            }
            
            setTimeout(() => {
                chatInput.value = message;
                sendMessage();
            }, 500);
        }

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });