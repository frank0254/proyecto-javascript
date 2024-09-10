document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogout = document.getElementById('btnLogout');
    const userName = document.getElementById('userName');
    const profilePic = document.getElementById('profilePic');

    // Función para actualizar la UI del usuario
    const updateUI = (username, profilePicUrl) => {
        userName.textContent = `Bienvenido, ${username}`;
        profilePic.src = profilePicUrl;
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        btnLogout.style.display = 'block';
    };

    // Manejar el evento de clic para Iniciar Sesión
    btnLogin.addEventListener('click', () => {
        Swal.fire({
            title: 'Iniciar Sesión',
            html: `
                <input type="email" id="loginEmail" class="swal2-input" placeholder="Correo Electrónico">
                <input type="password" id="loginPassword" class="swal2-input" placeholder="Contraseña">
            `,
            confirmButtonText: 'Iniciar Sesión',
            preConfirm: () => {
                const email = Swal.getPopup().querySelector('#loginEmail').value;
                const password = Swal.getPopup().querySelector('#loginPassword').value;
                if (!email || !password) {
                    Swal.showValidationMessage('Por favor, ingrese el correo electrónico y la contraseña');
                    return false;  // Evita el cierre del modal si la validación falla
                }
                // Aquí puedes añadir lógica para autenticar al usuario
                // Ejemplo simple:
                if (email === 'test@example.com' && password === 'password') {
                    const profilePicUrl = 'img/user-profile.png'; // Imagen de perfil del usuario
                    const username = 'Fran'; // Aquí puedes definir el nombre de usuario si es fijo
                    localStorage.setItem('user', JSON.stringify({ username, profilePic: profilePicUrl }));
                    updateUI(username, profilePicUrl);
                    return true;  // Permite el cierre del modal si la autenticación es exitosa
                }
                Swal.showValidationMessage('Credenciales incorrectas'); // Mensaje de error si las credenciales son incorrectas
                return false;
            }
        });
    });

    // Manejar el evento de clic para Registrarse
    btnRegister.addEventListener('click', () => {
        Swal.fire({
            title: 'Registrarse',
            html: `
                <input type="text" id="registerName" class="swal2-input" placeholder="Nombre">
                <input type="email" id="registerEmail" class="swal2-input" placeholder="Correo Electrónico">
                <input type="password" id="registerPassword" class="swal2-input" placeholder="Contraseña">
                <input type="file" id="registerProfilePic" class="swal2-input" accept="image/*">
            `,
            confirmButtonText: 'Registrarse',
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#registerName').value;
                const email = Swal.getPopup().querySelector('#registerEmail').value;
                const password = Swal.getPopup().querySelector('#registerPassword').value;
                const profilePicFile = Swal.getPopup().querySelector('#registerProfilePic').files[0];
                
                if (!name || !email || !password || !profilePicFile) {
                    Swal.showValidationMessage('Por favor, complete todos los campos');
                    return false;  // Evita el cierre del modal si la validación falla
                }
                
                // Crear una URL de objeto para la imagen cargada
                const profilePicUrl = URL.createObjectURL(profilePicFile);
                
                // Guardar los datos en localStorage
                localStorage.setItem('user', JSON.stringify({ username: name, profilePic: profilePicUrl }));
                updateUI(name, profilePicUrl);
                return true;  // Permite el cierre del modal si el registro es exitoso
            }
        });
    });

    // Manejar el evento de clic para Cerrar Sesión
    btnLogout.addEventListener('click', () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Está a punto de cerrar sesión",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                updateUI('Usuario', 'img/default-profile.png');
                Swal.fire('Sesión cerrada', 'Has cerrado sesión correctamente', 'success');
            }
        });
    });

    // Inicializar la UI si el usuario ya está logueado
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateUI(user.username, user.profilePic);
    }
});
