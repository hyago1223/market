async function loadComponent(id,filepath) {
    const container = document.getElementById(id);
    if(!container) return;
    const res = await fetch(filepath);
    container.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", () =>{
    loadComponent("header-container", "./components/header.html");
    loadComponent("footer-container","./components/footer.html")
});