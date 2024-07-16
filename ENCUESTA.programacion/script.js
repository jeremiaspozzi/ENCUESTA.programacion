document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const mensajeAgradecimiento = document.getElementById('agradecimiento');
    const emojisAtencion = document.getElementById('emojiAtencion');
    const emojisGrupo = document.getElementById('emojiGrupo');
    const radiosEquipo = document.querySelectorAll('input[name="equipo"]');
    const radiosFuturosNegocios = document.querySelectorAll('input[name="futurosNegocios"]');

    function actualizarEmojis() {
        const valorAtencion = document.getElementById('atencion').value;
        const valorGrupo = getRadioValue(radiosEquipo);
        emojisAtencion.textContent = valorEmocion(valorAtencion);
        emojisGrupo.textContent = valorGrupoEmocion(valorGrupo);
    }

    function valorEmocion(valor) {
        const emociones = {
            '1': '😞',
            '2': '😟',
            '3': '😐',
            '4': '🙂',
            '5': '😄'
        };
        return emociones[valor] || '😐';
    }

    function getRadioValue(radios) {
        for (const radio of radios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return '';
    }

    form.addEventListener('input', function(event) {
        if (event.target.matches('#atencion') || event.target.matches('input[name="equipo"]')) {
            actualizarEmojis();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch('/guardar_encuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            form.reset();
            form.style.display = 'none'; // Ocultar el formulario
            mensajeAgradecimiento.classList.remove('hidden'); // Mostrar el mensaje de agradecimiento
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    actualizarEmojis();
});
