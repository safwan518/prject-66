import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageTextExtractor = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const extractText = () => {
    if (!image) return alert('يرجى تحميل صورة أولاً.');
    
    setLoading(true);
    Tesseract.recognize(image, 'eng')
      .then(({ data: { text } }) => setText(text))
      .catch(() => alert("فشل في استخراج النص"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>استخراج النص من الصورة</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={extractText} disabled={loading}>
        {loading ? 'جارِ استخراج النص...' : 'استخراج النص'}
      </button>
      {image && <img src={image} alt="معاينة الصورة" style={{ display: 'block', marginTop: '20px' }} />}
      {text && <div><h3>النص المستخرج:</h3><p>{text}</p></div>}
    </div>
  );
};

export default ImageTextExtractor;