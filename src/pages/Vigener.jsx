import React from 'react';
import { useState } from 'react';

const Vigener = () => {
  const [value, setvalue] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [textarea, setTextarea] = useState('');
  const [countWord, setCountWord] = useState(26);

  const countWordmas = [26, 33];

  const vigenereEncrypt = (text, key) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const encryptedCharCode = charCode + keyChar;
      result += String.fromCharCode(encryptedCharCode);
    }
    return result;
  };

  // Функція для дешифрування тексту методом Віженера
  function vigenereDecrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const decryptedCharCode = charCode - keyChar;
      result += String.fromCharCode(decryptedCharCode);
    }
    return result;
  }

  const downloadFile = () => {
    const textToSave = textarea;
    const filename = 'file.txt';

    const blob = new Blob([textToSave], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);
  };

  const setValuetest = (event) => {
    setvalue(event.target.value);
  };
  const setKeytest = (event) => {
    setKeyValue(event.target.value);
  };

  const removeTextarea = () => {
    setTextarea('');
    setvalue('');
    setKeyValue('');
  };

  const clickOnArrow = () =>{
    textarea && setvalue(textarea)
  }
  const sendText = () => {
    setTextarea(vigenereEncrypt(value, keyValue));
  };

  const sendText2 = () => {
    setTextarea(vigenereDecrypt(value, keyValue));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setvalue(content);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <label htmlFor="input-text">Введіть або загрузіть текст:</label>
      <div className="container-input">
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <input onChange={setValuetest} value={value} id="input-text" type="text" />
        <div className="container-buttons">
          {countWordmas.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCountWord(item);
              }}
              className={countWord === item ? 'active' : ''}>
              {item === 33 ? 'ua' : 'eng'}
            </button>
          ))}
        </div>
        <div className="container-key">
          <label htmlFor="input-key">Введіть ключове слово</label>
          <input onChange={setKeytest} value={keyValue} id="input-key" type="text" />
        </div>
      </div>
      <button onClick={sendText} type="submit">
        зашифрувати
      </button>
      <button onClick={sendText2} type="submit">
        дешифрувати
      </button>
      <div className="encryptedText">
        <div className="encryptedText-block">
          <textarea value={textarea} name="test" id="" readOnly></textarea>
          <img onClick={removeTextarea} src="./close.png" alt="close" title="Очистити усі поля"/>
          <img onClick={clickOnArrow} src="./arrow.png" alt="arrow" title="Перенести текст"/>
        </div>
        <br />
        <button onClick={downloadFile}>Зберегти у файл</button>
      </div>
    </>
  );
};
export default Vigener;
