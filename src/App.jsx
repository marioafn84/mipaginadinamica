import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // ESTADOS

  const [fabricantes, setFabricantes] = useState([])

  const [nombre, setNombre] = useState('')
  const [pais, setPais] = useState('')
  const [fecha, setFecha] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [editar, setEditar] = useState(false)
  const [idEditar, setIdEditar] = useState(null)
  const [busquedaArticulo, setBusquedaArticulo] = useState('')

// Estados de fabricantes
// ESTADOS ARTICULOS
const [vista, setVista] = useState("inicio")

const [articulos, setArticulos] = useState([])

const [nombreArticulo, setNombreArticulo] = useState('')
const [precio, setPrecio] = useState('')
const [fabricanteArticulo, setFabricanteArticulo] = useState('')

const [idArticuloEditar, setIdArticuloEditar] = useState(null)
//terminan los estados



  // CONSULTAR FABRICANTES

  useEffect(() => {

    obtenerFabricantes()
    obtenerArticulos()

  }, [])


  // FUNCIÓN OBTENER DATOS

  const obtenerFabricantes = () => {

    fetch('http://https://crud-backend-2qmg.onrender.com/fabricantes')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setFabricantes(datos)
      })

  }




  //
  const obtenerArticulos = () => {

  fetch('http://https://crud-backend-2qmg.onrender.com/articulos')
    .then(respuesta => respuesta.json())
    .then(datos => {
      setArticulos(datos)
    })

}
  //

  // AGREGAR FABRICANTE

  const agregarFabricante = async () => {

    const datos = {
      nombre: nombre,
      pais: pais,
      fecha_fundacion: fecha
    }

    const respuesta = await fetch('http://https://crud-backend-2qmg.onrender.com/fabricantes', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(datos)

    })

    const mensaje = await respuesta.text()

    alert(mensaje)

    obtenerFabricantes()

    setNombre('')
    setPais('')
    setFecha('')

  }


  //eliminar fabricante

  const eliminarFabricante = async (id) => {

  await fetch(`http://https://crud-backend-2qmg.onrender.com/fabricantes/${id}`, {

    method: 'DELETE'

  })

  alert('Fabricante eliminado')

  obtenerFabricantes()

}
  // termina eliminar fabvricante



//modificar
const modificarFabricante = async () => {

  const datos = {
    nombre,
    pais,
    fecha_fundacion: fecha
  }

  await fetch(`http://https://crud-backend-2qmg.onrender.com/fabricantes/${idEditar}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(datos)

  })

  alert('Fabricante modificado')

  obtenerFabricantes()

  setEditar(false)

  setNombre('')
  setPais('')
  setFecha('')

}
//termina modificar
//empieza modificar de articulosd
const agregarArticulo = async () => {

  const datos = {
    nombre: nombreArticulo,
    precio: precio,
    idfabricante: fabricanteArticulo
  }

  await fetch('http://https://crud-backend-2qmg.onrender.com/articulos', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(datos)

  })

  alert('Artículo agregado')

  obtenerArticulos()

  setNombreArticulo('')
  setPrecio('')
  setFabricanteArticulo('')

}

//termina modificar de articulos

//eliminar articulo
const eliminarArticulo = async (id) => {

  await fetch(`http://https://crud-backend-2qmg.onrender.com/articulos/${id}`, {

    method: 'DELETE'

  })

  alert('Artículo eliminado')

  obtenerArticulos()

}

//termina eliminar articulo

//modificar articulo
const modificarArticulo = async () => {

  const datos = {
    nombre: nombreArticulo,
    precio: precio,
    idfabricante: fabricanteArticulo
  }

  await fetch(`http://https://crud-backend-2qmg.onrender.com/articulos/${idArticuloEditar}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(datos)

  })

  alert('Artículo modificado')

  obtenerArticulos()

  setNombreArticulo('')
  setPrecio('')
  setFabricanteArticulo('')

}


//terminamodificar articulo

//
//



  return (

    <div className="contenedor">

    


<header className="header">

  <h1>MafnTech Solutions</h1>
  

  <p>
    Sistema web dinámico para la gestión de fabricantes y artículos de una tienda informática
  </p>



<nav className="navbar">

  

  <a href="#inicio">
    Inicio
  </a>

  <a href="#fabricantes">
    Fabricantes
  </a>

  <a href="#articulos">
    Artículos
  </a>

</nav>

</header>



<section id="inicio">



<section className="bienvenida">

  <h2>Bienvenido al Sistema</h2>

  
    <p>
  Bienvenido a MafnTech Solutions,
  una plataforma dinámica,  diseñada para gestionar
  fabricantes y artículos de una tienda informatica de manera rápida,
  segura y eficiente.

  Nuestro objetivo es digitalizar procesos de inventario y mejorar
      el control de información en tiendas de informática.
</p>
  

</section>

</section>



<section id="fabricantes">


      <h1>CRUD Fabricantes</h1>

      <div className="formulario">

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="País"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

       <button onClick={agregarFabricante}>
  Agregar
</button>

<button onClick={modificarFabricante}>
  Modificar
</button>

      </div>

       <input
  type="text"
  placeholder="Buscar fabricante"
  className="busqueda"
  onChange={(e) => setBusqueda(e.target.value)}
/>






      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>País</th>
            <th>Fecha Fundación</th>
            <th>Acciones</th>
          </tr>

        </thead>

        
<tbody>

  {fabricantes
    .filter((fabricante) => {

      if(busqueda === ''){
        return true
      }

      return fabricante.nombre?.toLowerCase()
        .includes(busqueda.toLowerCase())

        ||

    fabricante.idfabricante
      .toString()
      .includes(busqueda)

  

    })

    

    .map((fabricante) => (

      <tr key={fabricante.idfabricante}>

        <td>{fabricante.idfabricante}</td>

        <td>{fabricante.nombre}</td>

        <td>{fabricante.pais}</td>

        <td>
          {new Date(fabricante.fecha_fundacion)
            .toLocaleDateString()}
        </td>

        <td>

  <button
    onClick={() => eliminarFabricante(fabricante.idfabricante)}
  >
    Eliminar
  </button>

  <button
    onClick={() => {

      setIdEditar(fabricante.idfabricante)

      setNombre(fabricante.nombre)

      setPais(fabricante.pais)

      setFecha(
        fabricante.fecha_fundacion?.split('T')[0]
      )

    }}
  >
    Editar
  </button>

</td>

      </tr>

    ))}

</tbody>

      </table>

</section>





<section id="articulos">
      <h1>CRUD Artículos</h1>

     

<div className="formulario">

  <input
    type="text"
    placeholder="Nombre artículo"
    value={nombreArticulo}
    onChange={(e) => setNombreArticulo(e.target.value)}
  />

  <input
    type="number"
    placeholder="Precio"
    value={precio}
    onChange={(e) => setPrecio(e.target.value)}
  />

  <select
    value={fabricanteArticulo}
    onChange={(e) => setFabricanteArticulo(e.target.value)}
  >

    <option value="">
      Selecciona fabricante
    </option>

    {fabricantes.map((fabricante) => (

      <option
        key={fabricante.idfabricante}
        value={fabricante.idfabricante}
      >
        {fabricante.nombre}
      </option>

    ))}

  </select>

  <button onClick={agregarArticulo}>
    Agregar
  </button>


  <button onClick={modificarArticulo}>
  Modificar
</button>



</div>

 <input
  type="text"
  placeholder="Buscar artículo"
  className="busqueda"
  onChange={(e) => setBusquedaArticulo(e.target.value)}
/>


<table>

  <thead>

    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Fabricante</th>
      <th>Acciones</th>
    </tr>

  </thead>

  <tbody>

    {articulos

  .filter((articulo) => {

    if(busquedaArticulo === ''){
      return true
    }

    return (

      articulo.nombre
        .toLowerCase()
        .includes(busquedaArticulo.toLowerCase())

      ||

      articulo.idarticulo
        .toString()
        .includes(busquedaArticulo)
        

    )

  })

  .map((articulo) => (

      <tr key={articulo.idarticulo}>

        <td>{articulo.idarticulo}</td>

        <td>{articulo.nombre}</td>

        <td>${articulo.precio}</td>

        <td>{articulo.fabricante}</td>


        <td>

  <button
    onClick={() => eliminarArticulo(articulo.idarticulo)}
  >
    Eliminar
  </button>

  <button
    onClick={() => {

      setIdArticuloEditar(articulo.idarticulo)

      setNombreArticulo(articulo.nombre)

      setPrecio(articulo.precio)

      setFabricanteArticulo(articulo.idfabricante)

    }}
  >
    Editar
  </button>

</td>

      </tr>

    ))}

  </tbody>

</table>

</section>



<footer className="footer">

  <p>
    © 2026 MafnTech Solutions - Tienda Informática
  </p>

</footer>




    </div>

  )

}

export default App