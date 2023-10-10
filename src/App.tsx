import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageCropper from './components/ImageCropper'

function App() {
  const [count, setCount] = useState(0)
  const [image, setImage] = useState<any>(null);
  const [isOpen, setisOpen] = useState<boolean>(false)

  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };



  return (
    <>
      <label className="_coverImage-holder">
        Upload Image
        <input
          type="file"
          name="cover"
          onChange={handleImageUpload}
          accept="img/*"
          style={{ display: "none" }}
        />
      </label>

      <div className=''>
        {
          image &&
          <ImageCropper image={image} />
        }
      </div>

      {/* <ImageCropper image={image} /> */}
    </>
  )
}

export default App 
