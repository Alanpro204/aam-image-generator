import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Turnstile } from '@marsidev/react-turnstile'

const url = import.meta.env.VITE_APP_URL || "http://localhost:3000/"
const siteKey = import.meta.env.VITE_APP_SITE_KEY

function App() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [generating, setGenerating] = useState(false)
  const [image, setImage] = useState(false)
  const [token, setToken] = useState(null)
  const handleTurnstileSuccess = (token) => {
    setToken(token);
  };

  const handleTurnstileError = (error) => {
    toast("No pudimos verificar que seas humano", { type: "error" })
  };

  const submit = (data) => {
    setGenerating(true)
    axios.post(
      `${url}generate`,
      {
        prompt: data.prompt,
        token: token
      }
    ).then((response) => {
      setImage(response.data.result.image)
      toast("Imagen creada con éxito")
    }).catch((e) => {
      console.log(e.response.data)
      toast("Error al generar, pruebe con otro prompt", { type: "error" })
    }).finally(() => {
      setGenerating(false)
      setToken(null)
    })
  }

  return (
    <div className='mx-4'>
      <section className='w-full h-screen flex mx-auto flex-col items-center mt-4'>
        <form className='flex flex-col max-w-2xl  gap-4' onSubmit={handleSubmit(submit)}>
          <h1 className='text-3xl text-center'>
            Generador de Imágenes <br /> <span className='gradient-text font-bold text-4xl'>Gratis</span></h1>
          <img className='mx-auto h-96 border-0 rounded-2xl' src={`${!image ? "/placeholder.jpg" : `data:image/jpeg;base64,${image}`}`} alt="" />
          <div className='flex flex-col gap-1'>
            <textarea placeholder='Describe la imagen que quieres generar...' className='resize-none focus:outline-0 focus:shadow-gray-600 shadow-gray-400 transition-all shadow p-4 h-32 rounded-md' {...register("prompt", { required: true })}></textarea>
            <p className='text-[12px] text-center text-gray-500 font-bold'>El modelo puede dar mejores resultados para prompts en inglés</p>
          </div>

          {
            token ?
              !generating
                ?
                <button className='hover:bg-gray-100 transition-all w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md cursor-pointer'>Generar</button>
                :
                <button disabled className='w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md bg-gray-200'>Generando</button>
              :
              <>
                <div className='w-fit mx-auto flex flex-col gap-2'>
                  <button disabled className='w-fit mx-auto px-12 shadow-gray-400 p-2 shadow rounded-md bg-gray-200'>Generar</button>
                  <Turnstile
                    className='mt-4'
                    siteKey={siteKey}  // Reemplaza con tu Site Key real
                    onSuccess={handleTurnstileSuccess}
                    onError={handleTurnstileError}
                    onExpire={() => {
                      console.log('Turnstile ha expirado.');
                      setToken(null); // Importante:  resetea el token si expira.
                    }}
                    options={{
                      theme: "light"
                    }}
                  />
                </div>
              </>
          }
        </form>
      </section>
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App
