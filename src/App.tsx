import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [email, setEmail] = useState<string>(''); //useState('')
  const [name, setName] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [convertedImg, setConvertedImg] = useState<string>('');
  const [errType, setErrType] = useState<string>('');

  const stringify = () => JSON.stringify({name, familyName, email, category, message, convertedImg});

  const getBase64 = () : void => {
    let reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = function () {
      let str = reader!.result!.toString();
      setConvertedImg(str);
    };
 }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const correct = check();
    if (correct) {
      if (file) {
        getBase64();
      }
      let json = stringify(); //и дальше отправляем на сервер
      console.log(json);
    }
  }

  const check = () => {
    if (!familyName && !name) {
      setErrType('Вы должны ввести имя или фамилию');
      return false;
    }
    if (!category) {
      setErrType('Вы должны выбрать одну из категорий сообщения');
      return false;
    }
    if (message.length < 10) {
      setErrType('Сообщение должно быть не менее 10 символов');
      return false;
    }
    if (file) {
      if (file.size > 2000000) {
        setErrType('Размер файла не должен превышать 2 Мб');
        return false;
      }
    }
    return true;
  }
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
              <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Форма обратной связи</h3>
                {errType ? 
                <div className="alert alert-danger" role="alert">
                  {errType}
                </div> : ''}

                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="Введите электронную почту" required onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}/>
                </div>

                <div className="form-group">
                    <label>Имя</label>
                    <input type="text" className="form-control" placeholder="Введите имя" onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}/>
                </div>

                <div className="form-group">
                    <label>Фамилия</label>
                    <input type="text" className="form-control" placeholder="Введите фамилию" onChange={(e: React.FormEvent<HTMLInputElement>) => setFamilyName(e.currentTarget.value)}/>
                </div>

                <div className="form-group">
                    <label>Категория сообщения</label>
                    <select className="form-select"  onChange={(e: React.FormEvent<HTMLSelectElement>) => setCategory(e.currentTarget.value)} required>
                      <option selected></option>
                      <option value="1">Категория сообщения 1</option>
                      <option value="2">Категория сообщения 2</option>
                      <option value="3">Категория сообщения 3</option>
                    </select>
                </div>


                <div className="form-group">
                    <label>Cообщение</label>
                    <input type="text" className="form-control form-control-text" placeholder="Введите сообщение" onChange={(e: React.FormEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)} required/>
                </div>
                <div className="form-group">
                <label htmlFor="file">Загрузить изображение</label>
                  <input type="file" id="file" name="file" accept="image/png, image/jpg, image/jpeg"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.currentTarget.files![0])}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Отправить</button>    
            </form>
            </div>
          </div>
    </div>
  );
}

export default App;
