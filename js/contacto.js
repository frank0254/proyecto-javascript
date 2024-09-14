document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        
        Swal.fire({
            icon: 'success',
            title: 'Mensaje Enviado',
            text: `Gracias, ${name}. Hemos recibido tu mensaje y te responderemos pronto.`,
            confirmButtonText: 'OK'
        }).then(() => {
            
            contactForm.reset();
        });
    });
});
