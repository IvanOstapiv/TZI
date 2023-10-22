import { useState } from 'react';
import './App.scss';
function App() {
  const [value, setvalue] = useState('');
  const [textarea, setTextarea] = useState('');
  const [countWord, setCountWord] = useState(26);
  
  const countWordmas = [26, 33];

  const encryptCaesar = (text, shift) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char.match(/[a-zA-Z]/)) {
        const charCode = text.charCodeAt(i);
        const shiftAmount = charCode >= 65 && charCode <= 90 ? 65 : 97;
        char = String.fromCharCode(((charCode - shiftAmount + shift) % 26) + shiftAmount);
      }
      if (char.match(/[а-яА-Я]/)) {
        const charCode = text.charCodeAt(i);
        const shiftAmount = charCode >= 1040 && charCode <= 1071 ? 1040 : 1072;
        char = String.fromCharCode(((charCode - shiftAmount + shift) % 33) + shiftAmount);
      }
      result += char;
    }
    return result;
  };

  const decryptCaesar = (text, shift) => {
    return encryptCaesar(text, countWord - shift);
  };

  const downloadFile = () => {
    const textToSave = textarea;
    const filename = 'file.txt';

    // Створення Blob з текстовим вмістом
    const blob = new Blob([textToSave], { type: 'text/plain' });

    // Створення URL для Blob
    const url = URL.createObjectURL(blob);

    // Створення посилання для завантаження файлу
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Симулювання кліку на посилання
    a.click();

    // Звільнення ресурсів URL
    URL.revokeObjectURL(url);
  };

  const setValuetest = (event) => {
    setvalue(event.target.value);
  };
  const removeTextarea = () => {
    setTextarea('');
    setvalue('');
  };
  const sendText = () => {
    setTextarea(encryptCaesar(value, 15));
  };

  const sendText2 = () => {
    setTextarea(decryptCaesar(value, 15));
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
      <header>
        <h1>Технології захисту інформації</h1>
      </header>
      <div className="container">
        <label htmlFor="input-text">Введіть або загрузіть текст:</label>
        <div className="container-input">
          <input type="file" accept=".txt" onChange={handleFileChange} />
          <input onChange={setValuetest} value={value} id="input-text" type="text" />
          {/* <label htmlFor="">{countWord}</label> */}
          <div className="container-buttons">
            {countWordmas.map((item, index) => (
              <button
              key={index}
              onClick={() => {setCountWord(item)}}
              className={countWord === item ? 'active' : ''}
              >{item === 33 ? "ua" : "eng"}</button>
              
            ))}
          </div>

          {/* <input type="radio">Укр.</input> */}
        </div>
        <button onClick={sendText} type="submit">
          зашифрувати
        </button>
        <button onClick={sendText2} type="submit">
          дешифрувати
        </button>
        <div className="encryptedText">
          <div className="encryptedText-block">
            <textarea value={textarea} name="test" id=""></textarea>
            <img onClick={removeTextarea} src="./close.png" alt="close" />
          </div>
          <br />
          <button onClick={downloadFile}>Зберегти файл</button>
        </div>
      </div>
    </>
  );
}

export default App;
