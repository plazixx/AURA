// Пароль для входа
const SECRET_PASSWORD = "дима-не-крутой";

// Ждем, пока страница загрузится, чтобы не было ошибок
document.addEventListener("DOMContentLoaded", function() {
    
    // Проверяем, вводил ли уже пароль этот пользователь в текущей сессии
    if (sessionStorage.getItem('site_unlocked') !== 'true') {
        
        // Прячем всё содержимое страницы
        document.body.style.display = 'none';
        
        // Создаем окно входа
        const loginOverlay = document.createElement('div');
        loginOverlay.id = 'login-overlay';
        loginOverlay.innerHTML = `
            <div class="login-box">
                <h2>Доступ ограничен</h2>
                <p>Введите пароль для входа в систему</p>
                <input type="password" id="password-input" placeholder="Пароль">
                <button id="login-submit">Войти</button>
                <p id="login-error" style="color: #ff3333; display: none;">Неверный пароль!</p>
            </div>
        `;
        document.body.appendChild(loginOverlay);

        // Добавляем стили для окна входа (в стиле сайта)
        const style = document.createElement('style');
        style.innerHTML = `
            #login-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(5, 5, 5, 0.95);
                display: flex; justify-content: center; align-items: center;
                z-index: 9999; backdrop-filter: blur(10px);
            }
            .login-box {
                background: #141414; border: 1px solid var(--theme-color, #a3ff12);
                border-radius: 15px; padding: 40px; text-align: center;
                box-shadow: 0 0 30px rgba(0,0,0,0.8);
                width: 90%; max-width: 400px;
            }
            .login-box h2 {
                color: var(--theme-color, #a3ff12);
                font-family: 'Courier New', monospace;
                margin-bottom: 10px; text-transform: uppercase;
                letter-spacing: 2px;
            }
            .login-box p {
                color: #aaa; margin-bottom: 20px; font-size: 0.9rem;
            }
            .login-box input {
                width: 100%; padding: 12px; background: #050505;
                border: 1px solid #333; color: #fff; border-radius: 8px;
                margin-bottom: 15px; outline: none; font-size: 1rem;
                text-align: center; box-sizing: border-box;
            }
            .login-box input:focus {
                border-color: var(--theme-color, #a3ff12);
                box-shadow: 0 0 10px var(--theme-color, #a3ff12);
            }
            .login-box button {
                width: 100%; padding: 12px;
                background: var(--theme-color, #a3ff12);
                color: #000; border: none; border-radius: 8px;
                font-weight: bold; cursor: pointer; font-size: 1rem;
                transition: 0.3s;
            }
            .login-box button:hover {
                background: #fff; box-shadow: 0 0 15px var(--theme-color, #a3ff12);
            }
        `;
        document.head.appendChild(style);

        // Функция проверки пароля
        const checkPassword = () => {
            const input = document.getElementById('password-input').value;
            
            if (input === SECRET_PASSWORD) {
                // Пароль верный
                sessionStorage.setItem('site_unlocked', 'true');
                document.body.style.display = 'block'; // Показываем сайт
                document.getElementById('login-overlay').remove(); // Убираем окно
            } else {
                // Пароль неверный
                document.getElementById('login-error').style.display = 'block';
                document.getElementById('password-input').value = '';
            }
        };

        // Обработчики событий
        document.getElementById('login-submit').addEventListener('click', checkPassword);
        document.getElementById('password-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });

    } else {
        // Если пароль уже введен, показываем страницу
        document.body.style.display = 'block';
    }
});