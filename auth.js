// auth.js
function checkAuth(redirectIfUnauthenticated = true) {
    const token = localStorage.getItem("authToken");
    if (!token && redirectIfUnauthenticated) {
        window.location.href = "index.html";
        return false;
    }
    return !!token;
}

function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}