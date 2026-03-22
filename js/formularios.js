const API_URL = 'https://tu-backend.railway.app/api'; // Reemplazar

document.addEventListener('DOMContentLoaded', function() {
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', async function(e) {
            e.preventDefault();

            const turnstileToken = document.querySelector('[name="cf-turnstile-response"]')?.value;
            const formData = new FormData(formContacto);
            const data = Object.fromEntries(formData.entries());
            if (turnstileToken) {
                data['cf-turnstile-response'] = turnstileToken;
            }

            try {
                const response = await fetch(`${API_URL}/contacto`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Mensaje enviado. En breve nos comunicaremos con usted.');
                    formContacto.reset();
                    if (window.turnstile) turnstile.reset();
                } else {
                    alert('Error: ' + (result.error || 'No se pudo enviar.'));
                }
            } catch (error) {
                alert('Error de conexión. Intente más tarde.');
                console.error(error);
            }
        });
    }
});