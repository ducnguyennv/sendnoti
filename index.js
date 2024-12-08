const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/send-message', async (req, res) => {
  try {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN không được cấu hình');
    }

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const response = await axios.post(telegramUrl, {
      chat_id: "5337310687",
      text: "Xin chào! Đây là tin nhắn từ bot của tôi."
    });

    res.json({
      message: "Tin nhắn đã được gửi thành công!",
      telegramResponse: response.data
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi gửi tin nhắn.",
      error: error.message
    });
  }
});

// Route mặc định
app.get('/', (req, res) => {
  res.json({ message: 'Server đang hoạt động!' });
});

// Khởi động server khi chạy locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server đang chạy tại port ${port}`);
  });
}

// Export cho Vercel
module.exports = app; 