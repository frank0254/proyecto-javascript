document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío del formulario para demostrar el uso de SweetAlert2
        
        // Obtén los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Mostrar alerta con SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Mensaje Enviado',
            text: `Gracias, ${name}. Hemos recibido tu mensaje y te responderemos pronto.`,
            confirmButtonText: 'OK'
        }).then(() => {
            // Limpiar el formulario después de enviar
            contactForm.reset();
        });
    });
});
