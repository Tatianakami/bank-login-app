document.addEventListener("DOMContentLoaded", function() {
    // Verificação de token mais segura
    const authToken = localStorage.getItem("authToken");
    if (authToken && !window.location.pathname.includes("index.html")) {
        window.location.href = "dashboard.html";
        return;
    }

    const loginForm = document.getElementById("loginForm");
    const errorElement = document.getElementById("errorMessage");
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const limparDadosBtn = document.getElementById("limparDadosBtn");

    // Checar se elementos existem
    if (!loginForm || !errorElement || !togglePassword || !passwordInput || !limparDadosBtn) {
        console.error("Elementos do formulário não encontrados!");
        return;
    }

    // Configuração do olho para mostrar/esconder senha
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        passwordInput.focus();
    });

    // Evento de submit do formulário
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value.trim();
        const captcha = document.getElementById("captcha").checked;

        // Senha temporária mais segura
        const TEMP_PASSWORD = "Admin@1234";

        // Validações
        if (!username || !password) {
            showError("Por favor, preencha todos os campos.");
            return;
        }

        if (!captcha) {
            showError("Por favor, confirme que não é um robô.");
            return;
        }

        // Simulação de login
        setTimeout(() => {
            if (username === "admin" && password === TEMP_PASSWORD) {
                localStorage.setItem("authToken", "temp-token-" + Date.now());
                window.location.href = "dashboard.html";
            } else {
                showError(`Credenciais inválidas. Use: admin / ${TEMP_PASSWORD}`);
            }
        }, 300);
    });

    // Botão limpar dados
    limparDadosBtn.addEventListener("click", function() {
        localStorage.clear();
        alert("Dados locais foram limpos com sucesso!");
        window.location.reload();
    });

    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
});