const cajatexto = document.getElementById('cajatexto')

const encriptador = document.getElementById('encriptador')

const desencriptador = document.getElementById('desencriptador')

const copiar = document.getElementById('copiar')

const mensajefinal = document.getElementById('mensajefinal')

const muniequito = document.getElementById('muneco')

const informacion = document.getElementById('informacion')

const seccionsegunda = document.getElementById('seccionsegunda')

const MAX_CHAR = 122
const MIN_CHAR = 97

const reemplazo = {
  e: 'enter',
  o: 'ober',
  i: 'imes',
  a: 'ai',
  u: 'ufat',
}

const validarTexto = (texto) => {
  if (texto === '') {
    alert('No hay texto para encriptar')
    return false
  }
  if (texto.match(/[^a-z]/)) {
    alert(
      'El texto no puede contener caracteres especiales ni números ni ser mayusculas'
    )
    return false
  }

  return true
}

const reemplazarTexto = (texto) => {
  mensajefinal.innerHTML = texto
  cajatexto.value = ''
  muniequito.style.display = 'none'
  informacion.style.display = 'none'
  copiar.style.display = 'block'
}

const limpiarCampos = () => {
  cajatexto.value = ''
  mensajefinal.innerHTML = ''
  muniequito.style.display = 'block'
  informacion.style.display = 'block'
  copiar.style.display = 'none'
  cajatexto.focus()
}

encriptador.addEventListener('click', () => {
  const texto = cajatexto.value

  if (!validarTexto(texto)) {
    return limpiarCampos()
  }
  let nuevoTexto = ''

  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i]
    let codigo = letra.charCodeAt(0) + 10
    let encriptado =
      codigo > MAX_CHAR
        ? String.fromCharCode(codigo - 25)
        : String.fromCharCode(codigo)

    if (encriptado in reemplazo) {
      encriptado = reemplazo[encriptado]
    }

    nuevoTexto += encriptado
  }
  reemplazarTexto(nuevoTexto)
})

desencriptador.addEventListener('click', () => {
  console.log('Desencriptando...')
  let texto = cajatexto.value
  if (!validarTexto(texto)) {
    return limpiarCampos()
  }

  for (let [key, value] of Object.entries(reemplazo)) {
    texto = texto.replace(new RegExp(value, 'g'), key)
  }

  let nuevoTexto = ''

  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i]
    let codigo = letra.charCodeAt(0) - 10
    let encriptado =
      codigo < MIN_CHAR
        ? String.fromCharCode(codigo + 25)
        : String.fromCharCode(codigo)

    nuevoTexto += encriptado
  }
  reemplazarTexto(nuevoTexto)
})

copiar.addEventListener('click', () => {
  console.log('Copiando...')
  const texto = mensajefinal.value

  navigator.clipboard
    .writeText(texto)
    .then()
    .catch((err) => {
      console.error('Error al copiar', err)
    })
})
