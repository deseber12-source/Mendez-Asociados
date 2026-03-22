async function loadComponent(element) {
    const componentName = element.getAttribute('data-component');
    if (!componentName) return;

    try {
        const response = await fetch(`componentes/${componentName}.html`);
        if (!response.ok) throw new Error('Error al cargar componente');
        const html = await response.text();
        element.innerHTML = html;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/componentes/${componentName}.css`;
        document.head.appendChild(link);
    } catch (error) {
        console.error(`Error cargando ${componentName}:`, error);
        element.innerHTML = `<p>Error al cargar contenido</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('[data-component]');
    components.forEach(loadComponent);

    setTimeout(() => {
        const toggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (toggle && navMenu) {
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }, 500);
});