document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    
    let themeClass = '';
    let symbol = '❅';
    let themeColor = '#a3ff12'; // Цвет по умолчанию

    if (month >= 9 && month <= 11) { themeClass = 'theme-halloween'; symbol = '🎃'; themeColor = '#ff6600'; } 
    else if (month === 12 || month === 1 || (month === 2 && day <= 28)) { themeClass = 'theme-newyear'; symbol = '❅'; themeColor = '#a3ff12'; } 
    else if (month >= 3 && month <= 5) { themeClass = 'theme-spring'; symbol = '🌸'; themeColor = '#ff99cc'; } 
    else if (month >= 6 && month <= 8) { themeClass = 'theme-summer'; symbol = '☀'; themeColor = '#00ffff'; }

    document.body.classList.add(themeClass);
    // Передаем цвет в CSS переменную для удобства
    document.documentElement.style.setProperty('--theme-color', themeColor);

    for(let i = 0; i < 40; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = symbol;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = (Math.random() * 1.5 + 0.5) + 'em';
        particle.style.color = themeColor;
        document.body.appendChild(particle);
    }
});