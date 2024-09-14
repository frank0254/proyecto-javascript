document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogout = document.getElementById('btnLogout');
    const userName = document.getElementById('userName');
    const profilePic = document.getElementById('profilePic');

   
    const updateUI = (username, profilePicUrl) => {
        userName.textContent = `Bienvenido, ${username}`;
        profilePic.src = profilePicUrl;
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        btnLogout.style.display = 'block';
    };

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
                    return false;  
                }
                
                if (email === 'test@example.com' && password === 'password') {
                    const profilePicUrl = 'img/user-profile.png'; 
                    const username = 'Fran'; 
                    localStorage.setItem('user', JSON.stringify({ username, profilePic: profilePicUrl }));
                    updateUI(username, profilePicUrl);
                    return true;  
                }
                Swal.showValidationMessage('Credenciales incorrectas'); 
                return false;
            }
        });
    });

   
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
                    return false;  
                }
                
                
                const profilePicUrl = URL.createObjectURL(profilePicFile);
                
                
                localStorage.setItem('user', JSON.stringify({ username: name, profilePic: profilePicUrl }));
                updateUI(name, profilePicUrl);
                return true;  
            }
        });
    });

    
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

    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateUI(user.username, user.profilePic);
    }
});
