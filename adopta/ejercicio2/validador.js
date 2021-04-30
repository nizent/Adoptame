/**
 * Imprime error
 * @param {string|number} msg
 */
function mostrarError(msg) {
    let contenedor = document.getElementById('error');
    contenedor.innerHTML = msg;
    contenedor.style.display = 'block';
    contenedor.style.fontWeight = '800';
}
function borras() {
    let contenedor = document.getElementById('error');
    contenedor.style.display = 'none';
}

/**
 Validacion del formulario
 */
function validacionFormulario() {
    /*nombre usuario*/
    var mensaje="El formulario contiene errores. Se ha equivocado:<br>";
    /** @type {string}*/ let nombre = document.getElementById('nombre').value;
    let regex = /^[a-zA-Z ]*$/;
    var nombre_usuario=nombre.length >= 10 && nombre.length <= 100 && regex.test(nombre);
    if(!nombre_usuario){
        mensaje+="<div>Nombre de usuario incorrecto, debe ser de largo entre 10 y 100 y no contener caracteres que no sean a-z/A-Z </div>";
    }
    /*archivo*/
    /** @type {}*/ let archiv=document.getElementById("archivo").files;
    var archivo= (archiv.length>=1);
    if(!archivo){
        mensaje+="<div>No ha subido su archivo</div>";
    }
    /*selector de privacidad*/
    let selector=document.getElementById("privacidad");
    var selector_de_privacidad=(selector.options[selector.selectedIndex].value!="");
    if(!selector_de_privacidad){
        mensaje+="<div>No ha seleccionado una opción de privacidad</div>";
    }
    /*contraseña-opcional*/
    let contr=document.getElementById("password").value;
    var forbidden_passwords=["password","1234", "pass", "user", "hackbox"];
    var contrasena=(contr.length==0)||(contr.length>=1)&&((contr.length <=10) && !forbidden_passwords.includes(contr));
    if(!contrasena){
        mensaje+="<div>Su contraseña no debe ser password,1234,pass,user,hackbox</div>";
    }
    /*autodestruir-opcional*/
    let autod=document.getElementById("autodestruir").value;
    var autodestruir= (autod.length==0)||(autod.length>=1 && autod>=1 && autod<=3153600);
    if(!autodestruir){
        mensaje+="<div>Autodestruir debe ser un número entre 1 y 3153600</div>";
    }
    /*comentario-opcional*/
    let coment=document.getElementById("comentario").value;
    var comentario=(coment=="") || (coment!=""&& coment.length<=1000);
    if(!comentario){
        mensaje+="<div>El comentario debe ser de largo menor a 1000</div>";
    }
    var exp=nombre_usuario && archivo && selector_de_privacidad && contrasena && autodestruir;
    if (!exp) {
        mostrarError(mensaje);
        return false;
    }

    /*
    La idea sería ir añadiendo más validaciones aquí, e ir concatenando el mensaje
    de error si es que existe, para al final realizar "mostrarError(mensaje_error_concatenado)".
     */
    return true;
}
console.log('app v1.0'); // stack trace