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
function handleLoginSuccess(user) {
// Загрузка данных пользователя
fetch('https://gateway.scan-interfax.ru/api/v1/account/info')
  .then(response => response.json())
  .then(data => {
    // Сохранение данных пользователя в переменной
    const userData = data;

    // Обновление интерфейса с данными пользователя
    const userPanel = document.getElementById('user-panel');
    userPanel.innerHTML = `
      <img src="${userData.avatarUrl}" alt="User Avatar" />
      <div>
        <p>Имя: ${user.name}</p>
        <p>Лимит компаний: ${userData.companyLimit}</p>
        <p>Используется компаний: ${userData.usedCompanies}</p>
      </div>
      <button onclick="handleLogout()">Выйти</button>
    `;

    // Обновление другого элемента на странице
    const apiDataElement = document.getElementById('api-data');
    apiDataElement.innerHTML = `
      <p>Использовано компаний: ${userData.usedCompanies}</p>
      <p>Лимит по компаниям: ${userData.companyLimit}</p>
    `;
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных пользователя:', error);
  });


    document.addEventListener("DOMContentLoaded", async () => {
      try {
          const response = await fetch("https://gateway.scan-interfax.ru/api/v1/account/info"); // Замените на ваш URL API
          if (!response.ok) {
              throw new Error("Ошибка при получении данных");
          }
          const data = await response.json();
          const apiDataElement = document.getElementById("api-data");
          apiDataElement.innerHTML = `
              <p>Использовано компаний: ${data.usedCompanies}</p>
              <p>Лимит по компаниям: ${data.companyLimit}</p>
          `;
      } catch (error) {
          console.error("Ошибка:", error);
      }
  });
}



ReactDOM.render(React.createElement(Header), document.getElementById('root'));


















