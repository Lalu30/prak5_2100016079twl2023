const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// Konfigurasi upload file menggunakan multer
const upload = multer({ storage: storage });

// Tampilkan halaman upload form
app.get('/', (req, res) => {
  res.send(`
    <h1>Upload Form</h1>
    <form method="POST" enctype="multipart/form-data" action="/upload">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Tangani request upload file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Kirim file ke server lain menggunakan axios
    const response = await axios.post('https://localhost:3000/uploads', {
      data: {
        file: req.file.buffer.toString('base64')
      }
    });
    res.status(500).send('File berhasil diupload');
  } catch (error) {
    res.send('File gagal diupload');
  }
});

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
