import React from 'react';
import { useState } from 'react';

const Vigener = () => {
  const [value, setvalue] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [textarea, setTextarea] = useState('');
  const [countWord, setCountWord] = useState(27);

  const [isCyrillic, setIsCyrillic] = useState(true);
  const alphabetRegex = isCyrillic ? /[a-zA-Z]/ : /[а-яА-Я]/;
  const defaultChar = isCyrillic ? 96 : 1071;
  console.log(countWord, alphabetRegex, defaultChar);
  const countWordmas = [27, 33];

  function vigenereEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charKey = key[i % key.length];
      if ((char.match(alphabetRegex)) || char == ' ') {
        if (char.charCodeAt(0) !== 32) {
          const encryptedText = (char.charCodeAt(0) - defaultChar + (charKey.charCodeAt(0) - defaultChar)) % countWord;
          result += String.fromCharCode(
            encryptedText != 0 ? encryptedText + defaultChar : encryptedText + 32,
          );
        } else {
          const encryptedText = (0 + charKey.charCodeAt(0) - defaultChar) % countWord;
          result += String.fromCharCode(encryptedText + defaultChar);
        }
      } else {
        result += char;
      }
    }
    return result;
  }
  
  // Функція для дешифрування тексту за допомогою шифру Віженера
  function vigenereDecrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charKey = key[i % key.length];
      const charOffSet = char.charCodeAt(0);
      const charKeyOffSet = charKey.charCodeAt(0);
      console.log(charOffSet + ' - char - ' + char);
      console.log(charKeyOffSet + ' - key - ' + charKey);
  
      if (char.match(alphabetRegex)) {
        const decryptedText =
          charOffSet >= charKeyOffSet
            ? charOffSet - defaultChar - (charKeyOffSet - defaultChar)
            : charOffSet - defaultChar + countWord - (charKeyOffSet - defaultChar);
        result += String.fromCharCode(decryptedText != 0 ? decryptedText + defaultChar : decryptedText + 32);
      } else {
        result += charOffSet == 32 ? String.fromCharCode(countWord - (charKeyOffSet - defaultChar) + defaultChar) : char;
      }
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
    // setKeyValue('');
  };

  const clickOnArrow = () =>{
    textarea && setvalue(textarea)
  }
  const sendText = () => {
    setTextarea(vigenereEncrypt(value.toLowerCase(), keyValue));
  };

  const sendText2 = () => {
    setTextarea(vigenereDecrypt(value.toLowerCase(), keyValue));
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

  const setAlphabet = (item) =>{
    setCountWord(item)
    setIsCyrillic(item == 27 ? true : false)
  }

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
                setAlphabet(item);
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
