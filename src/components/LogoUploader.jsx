import * as THREE from "three";

const LogoUploader = ({ setLogoTexture }) => {
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const loader = new THREE.TextureLoader();
          const fileUrl = URL.createObjectURL(file); // Generar URL local
          const texture = loader.load(fileUrl, (tex) => {
            console.log("Textura cargada correctamente:", tex);
            setLogoTexture(tex); // Pasar la textura convertida
          });
        }
      };
  
    return (
      <div>
        <label htmlFor="logoUploader">Subir Logo:</label>
        <input
          id="logoUploader"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ marginLeft: "10px" }}
        />
      </div>
    );
  };
  
  export default LogoUploader;