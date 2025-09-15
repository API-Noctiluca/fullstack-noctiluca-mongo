import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createButterfly } from '../services/ButterflyServices.jsx';
import Swal from 'sweetalert2';
import '../style/createbutterfly.css';

export default function CreateButterfly() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    other_names: '',
    family: '',
    location: '',
    habitat: '',
    morphology: '',
    life: '',
    feeding: '',
    conservation: '',
    about_conservation: '',
    image: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = () => {
    if (!window.cloudinary) {
      alert('Error: Cloudinary no está disponible. Verifica que el script esté cargado.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget({
      cloudName: 'dggqy6jfb',
      uploadPreset: 'butterflies_preset',
      folder: 'butterflies',
      multiple: false,
      resourceType: 'image',
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 10000000,
      sources: ['local', 'url', 'camera']
    }, (error, result) => {
      console.log('Cloudinary result:', result); 
      if (error) {
        console.error('Error en Cloudinary:', error);
        return;
      }
      if (result && result.event === "success") {
        setFormData(prev => ({ ...prev, image: result.info.secure_url }));
      }
    });

    widget.open();
  };

  const validateField = (name, value) => {
    if (['name','habitat','feeding','morphology','family','life','conservation','about_conservation','location'].includes(name) && !value.trim()) {
      return 'Este campo es obligatorio';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setFormErrors(prev => {
      const updated = { ...prev };
      if (error) updated[name] = error;
      else delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (Object.keys(formErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        html: Object.values(formErrors).join('<br>')
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const newButterfly = { ...formData };
      const result = await createButterfly(newButterfly);

      if (result) {
        setMessage('¡Mariposa añadida correctamente!');
        setFormData({
          name: '',
          other_names: '',
          family: '',
          location: '',
          habitat: '',
          morphology: '',
          life: '',
          feeding: '',
          conservation: '',
          about_conservation: '',
          image: ''
        });
        setFormErrors({});
        setTimeout(() => navigate('/butterflygallery'), 1500);
      } else {
        setMessage('Error al añadir la mariposa');
      }
    } catch (error) {
      setMessage('Error de conexión: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToGallery = () => navigate('/butterflygallery');

  return (
    <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      <div className="create-butterfly-container">

        <div className="main-content">
          <div className="form-wrapper">
            <div className="header-section">
              <h1 className="main-title">
                Cada mariposa tiene una historia ¿Quieres contarla?
              </h1>
              <p className="subtitle">
                Comparte lo que sabes sobre una especie europea.
              </p>
              <p className="subtitle">
                Con tu ayuda, la magia de Noctiluca seguirá creciendo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="butterfly-form">
              {message && (
                <div className={`message ${message.includes('correctamente') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="form-content">
                {/* Primera fila - 3 columnas */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">habitat</label>
                    <input
                      type="text"
                      name="habitat"
                      value={formData.habitat}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Alimentación</label>
                    <input
                      type="text"
                      name="feeding"
                      value={formData.feeding}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Segunda fila  */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Otros nombres</label>
                    <input
                      type="text"
                      name="other_names"
                      value={formData['other_names']}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Morfología</label>
                    <input
                      type="text"
                      name="morphology"
                      value={formData.morphology}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Conservación detallada</label>
                    <input
                      type="text"
                      name="conservation"
                      value={formData.conservation}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Familia</label>
                    <input
                      type="text"
                      name="family"
                      value={formData.family}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Vida</label>
                    <input
                      type="text"
                      name="life"
                      value={formData.life}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Estado de conservación</label>
                    <select
                      name="about_conservation"
                      value={formData.about_conservation}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="LC">LC (Least Concern)</option>
                      <option value="NT">NT (Near Threatened)</option>
                      <option value="VU">VU (Vulnerable)</option>
                      <option value="EN">EN (Endangered)</option>
                      <option value="CR">CR (Critically Endangered)</option>
                    </select>
                  </div>
                </div>

                {/* Cuarta fila - 2 columnas */}
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label className="form-label">Ubicación</label>
                    <textarea
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      rows="4"
                      className="form-textarea"
                      required
                    />
                  </div>                 

                  <div className="form-group">
                    <label className="form-label">Imagen</label>
                    <div className="image-upload-section">
                      <textarea
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        rows="3"
                        className="form-textarea"
                        placeholder="https://"
                      />
                      <div className="upload-divider">O</div>
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="upload-button"
                      >
                        📁 Subir imagen desde ordenador
                      </button>
                    </div>
                  </div>
                  
                </div>

                {/* Botón de envío */}
                <div className="submit-container">
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(formErrors).length > 0}
                    className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
                  >
                    {isSubmitting ? 'Guardando...' : 'Crear Mariposa'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
