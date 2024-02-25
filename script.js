const { useState, useEffect } = React;

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false); // новое состояние для успешного входа

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null); // очистить сообщения об ошибках при закрытии модального окна
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Предотвращает обновление страницы

    try {
      const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
        login: username,
        password: password
      });
      console.log(response.data);
      setToken(response.data.accessToken); // Сохраняем токен
      setLoginSuccess(true); // Устанавливаем loginSuccess в true при успешном входе
    } catch (error) {
      console.error(error);
      setLoginSuccess(false); // Устанавливаем loginSuccess в false при ошибке
      if (error.response && error.response.status === 400) {
        setError('Ошибка запроса: проверьте введенные данные и формат запроса'); // установить сообщение об ошибке
      } else if (error.response && error.response.status === 401) {
        setError('Неверный логин или пароль'); // установить сообщение об ошибке
      } else if (!navigator.onLine) {
        setError('Проблемы с соединением'); // установить сообщение об ошибке
      } else {
        setError('Произошла неизвестная ошибка'); // установить сообщение об ошибке
      }
    }
  };

  return React.createElement('header', { id: 'site-header', className: 'site-header' },
    // Ваш код
    React.createElement('div', { id: 'user-info', className: 'username' },
  React.createElement('button', { id: 'register', className: 'registr', onClick: handleOpenModal }, 'Зарегистрироваться'),
  React.createElement('div', { className: 'block' }),
  React.createElement('button', { id: 'login', className: 'enter', onClick: handleOpenModal }, 'Войти')
),

    showModal && (
      React.createElement('form', { className: 'modal', onSubmit: handleLogin },
        React.createElement('input', { type: 'text', value: username, onChange: (e) => setUsername(e.target.value), placeholder: 'Логин' }),
        React.createElement('input', { type: 'password', value: password, onChange: handlePasswordChange, placeholder: 'Пароль' }), // Используем handlePasswordChange здесь
        error && React.createElement('div', { id: 'error-message', className: 'error-message' }, error), // отображение сообщения об ошибке
        React.createElement('button', { type: 'button', onClick: handleLogin }, 'Войти'),
        React.createElement('button', { type: 'button', onClick: handleCloseModal }, 'Закрыть')
      )
    ),
    loginSuccess && React.createElement('div', { id: 'success-message', className: 'success-message' }, 'Вы успешно вошли в систему!') // отображение сообщения об успешном входе
    // Ваш код
  );
}

ReactDOM.render(React.createElement(Header), document.getElementById('root'));


















