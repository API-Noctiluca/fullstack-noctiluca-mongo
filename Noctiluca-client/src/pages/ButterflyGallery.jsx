import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/butterflygallery.css';
import { getAllButterflies, updateButterfly, deleteButterfly } from '../services/ButterflyServices';
import Swal from 'sweetalert2';
import ButtonCreateButterfly from '../components/ButtonCreateButterfly';


export default function ButterflyGallery() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingButterfly, setEditingButterfly] = useState(null);
  const [editFormData, setEditFormData] = useState({
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

  useEffect(() => {
    fetchButterflies();
  }, []);

  async function fetchButterflies() {
    try {
      setLoading(true);
      setError(null);
      
      // Usar el servicio getAllButterflies
      const butterflies = await getAllButterflies();
      
      if (butterflies) {
        // Verificar la estructura de los datos
        if (butterflies.butterfly) {
          setData(butterflies.butterfly);
        } else if (Array.isArray(butterflies)) {
          setData(butterflies);
        } else {
          throw new Error("Estructura de datos no reconocida");
        }
      } else {
        throw new Error("No se pudieron cargar los datos");
      }
      
    } catch (error) {
      console.error('Error en la petición:', error);
      setError(`Error del servidor: ${error.message}.`);
    } finally {
      setLoading(false);
    }
  }

  // Función para navegar al detalle de la mariposa
  const handleCardClick = (butterfly) => {
    navigate(`/butterflydetail/${butterfly._id}`, { state: { butterfly } });
  };

  // Función para manejar la edición
  const handleEdit = (e, butterfly) => {
    e.stopPropagation(); // Prevenir que se active el click de la card
    setEditingButterfly(butterfly);
    setEditFormData({
      name: butterfly.name || '',
      other_names: butterfly.other_names || '',
      family: butterfly.family || '',
      location: butterfly.location || '',
      habitat: butterfly.habitat || '',
      morphology: butterfly.morphology || '',
      life: butterfly.Life || '',
      feeding: butterfly.feeding || '',
      conservation: butterfly.conservation || '',
      about_conservation: butterfly.about_conservation || '',
      image: butterfly.image || ''
    });
    setShowEditModal(true);
  };

  // Función para obtener el color del estado de conservación
  const getConservationColor = (status) => {
    if (!status) return '#f5e0a3';
    
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('lc') || lowerStatus.includes('preocupación menor')) {
      return '#4ade80'; // Verde
    } else if (lowerStatus.includes('nt') || lowerStatus.includes('casi amenazada')) {
      return '#fbbf24'; // Amarillo
    } else if (lowerStatus.includes('vu') || lowerStatus.includes('vulnerable')) {
      return '#f97316'; // Naranja
    } else if (lowerStatus.includes('en') || lowerStatus.includes('peligro')) {
      return '#ef4444'; // Rojo
    } else if (lowerStatus.includes('cr') || lowerStatus.includes('crítico')) {
      return '#dc2626'; // Rojo oscuro
    } else if (lowerStatus.includes('ex') || lowerStatus.includes('extinta')) {
      return '#6b7280'; // Gris
    }
    return '#f5e0a3'; // Color por defecto
  };

  // Función para manejar la eliminación con SweetAlert2 personalizado
  const handleDelete = async (e, butterfly) => {
    e.stopPropagation(); // Prevenir que se active el click de la card
    
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar la mariposa "${butterfly.name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text',
          confirmButton: 'custom-swal-confirm',
          cancelButton: 'custom-swal-cancel'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3',
        backdrop: `rgba(0, 0, 0, 0.7)`
      });

      if (result.isConfirmed) {
        await deleteButterfly(butterfly._id);
        await fetchButterflies();
        
        Swal.fire({
          title: 'Eliminada',
          text: 'La mariposa ha sido eliminada correctamente.',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
          },
          background: 'rgba(29, 27, 63, 0.95)',
          color: '#f5e0a3'
        });
      }
    } catch (error) {
      console.error('Error al eliminar la mariposa:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar la mariposa.',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
    }
  };

  // Función para manejar el envío del formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateButterfly(editingButterfly._id, editFormData);
      setShowEditModal(false);
      setEditingButterfly(null);
      // Actualizar la lista después de editar
      await fetchButterflies();
      
      Swal.fire({
        title: 'Actualizada',
        text: 'La mariposa ha sido actualizada correctamente.',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
    } catch (error) {
      console.error('Error al actualizar la mariposa:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar la mariposa.',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
    }
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleImageUpload = () => {
    // Verificar que Cloudinary esté disponible
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
      maxFileSize: 10000000, // 10MB
      sources: ['local', 'url', 'camera']
    }, (error, result) => {
      console.log('Cloudinary result:', result); // Para debug
      
      if (error) {
        console.error('Error en Cloudinary:', error);
        return;
      }
      
      if (result && result.event === "success") {
        console.log('Imagen subida exitosamente:', result.info.secure_url); // Para debug
        setEditFormData(prev => ({
          ...prev,
          image: result.info.secure_url
        }));
      }
    });

    widget.open();
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowEditModal(false);
    setEditingButterfly(null);
  };

  // ❌ ELIMINADO: El loading ya no se muestra
  // if (loading) {
    // return (
      // <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
        // <div className="loading-container">
          // <div className="loading-spinner"></div>
          // <h1>Galería de Mariposas</h1>
          // <p>Cargando mariposas...</p>
        // </div>
      // </section>
    // );
  // }

  // ✅ NUEVO: Mensaje de error estilizado como en el mapa
  if (error) {
    return (
      <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
        <div className="gallery-container">
          <div className="gallery-content">
            <h1 className="gallery-title enhanced-title">Galería de Mariposas Europeas</h1>
            
            <div className="error-message-container">
              <div className="text-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl sm:rounded-3xl border border-amber-400/30 sm:border-2 shadow-xl">
                <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6 opacity-60">🦋</div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
                  Error al cargar las mariposas
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-light max-w-md mx-auto mb-4">
                  {error}
                </p>
                <div className="text-sm sm:text-base text-slate-500">
                  <strong>Posibles soluciones:</strong>
                  <ul className="mt-2 text-left max-w-sm mx-auto">
                    <li>• Verifica que el servidor esté ejecutándose en puerto 3002</li>
                    <li>• Revisa la estructura del archivo JSON</li>
                    <li>• Comprueba la consola del servidor para más detalles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonCreateButterfly/>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      <div className="gallery-container">
        <div className="gallery-content">
          <h1 className="gallery-title enhanced-title">Galería de Mariposas Europeas</h1>

          {Array.isArray(data) && data.length > 0 ? (
            <div className="cards-grid">
              {data.map((butterfly) => (
                <div key={butterfly._id} className="card-container">
                  <div className="card" onClick={() => handleCardClick(butterfly)}>
                    
                    {/* Parte frontal - Imagen con estado de conservación */}
                    <div className="card-front">
                      {/* Estado de conservación en la parte superior */}
                      <div 
                        className="conservation-badge"
                        style={{ backgroundColor: getConservationColor(butterfly['about conservation']) }}
                      >
                        {butterfly.about_conservation || 'No especificado'}
                      </div>
                      
                      <img
                        src={butterfly.image || 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop&auto=format'}
                        alt={butterfly.name}
                        className="butterfly-image"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop&auto=format';
                        }}
                      />
                      <div className="image-overlay"></div>
                      <div className="hover-indicator">
                        <span>Dame clic! 👆</span>
                      </div>
                    </div>

                    {/* Parte trasera - Información básica y Botones */}
                    <div className="card-back">
                      <div className="card-info">
                        <div className="butterfly-name">
                          {butterfly.name || 'No disponible'}
                        </div>
                        
                        <div className="butterfly-family">
                          {butterfly.family || 'No especificada'}
                        </div>
                        
                        <div className="location-section">
                          <h3>Ubicación</h3>
                          <p>{butterfly.Location || 'No especificada'}</p>
                        </div>

                        {/* Botones de Editar y Eliminar */}
                        <div className="card-actions">
                          <button 
                            className="btn-edit improved-btn"
                            onClick={(e) => handleEdit(e, butterfly)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn-delete improved-btn"
                            onClick={(e) => handleDelete(e, butterfly)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <div className="no-data-icon">🦋</div>
              <h2>No se encontraron datos de mariposas</h2>
              <p>Verifica que el servidor esté proporcionando los datos correctamente.</p>
            </div>
          )}
        </div>

        {/* Modal de Edición Expandido con todos los campos del JSON */}
        {showEditModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content expanded-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Editar Mariposa</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>
              
              <div className="edit-form expanded-form">
                <div className="form-columns">
                  {/* Columna 1 - Información Básica */}
                  <div className="form-column">
                    <h3>Información Básica</h3>
                    
                    <div className="form-group">
                      <label htmlFor="name">Nombre:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="other_names">Otros nombres:</label>
                      <input
                        type="text"
                        id="other_names"
                        name="other names"
                        value={editFormData.other_names}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="family">Familia:</label>
                      <input
                        type="text"
                        id="family"
                        name="family"
                        value={editFormData.family}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Ubicación:</label>
                      <textarea
                        id="location"
                        name="location"
                        value={editFormData.location}
                        onChange={handleInputChange}
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Columna 2 - Características Físicas y Hábitat */}
                  <div className="form-column">
                    <h3>Características y Hábitat</h3>
                    
                    <div className="form-group">
                      <label htmlFor="habitat">Hábitat:</label>
                      <textarea
                        id="habitat"
                        name="habitat"
                        value={editFormData['habitat']}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descripción del habitat natural"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="morphology">morfología:</label>
                      <textarea
                        id="morphology"
                        name="morphology"
                        value={editFormData.morphology}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descripción física de la mariposa"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="life">Vida:</label>
                      <textarea
                        id="life"
                        name="life"
                        value={editFormData.life}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Ciclo de vida y comportamiento"
                      ></textarea>
                    </div>
                  </div>

                  {/* Columna 3 - Comportamiento y Conservación */}
                  <div className="form-column">
                    <h3>Comportamiento y Conservación</h3>
                    
                    <div className="form-group">
                      <label htmlFor="feeding">Alimentación:</label>
                      <textarea
                        id="feeding"
                        name="feeding"
                        value={editFormData.feeding}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Hábitos alimentarios"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="conservation">Conservación Detallada:</label>
                      <textarea
                        id="conservation"
                        name="conservation"
                        value={editFormData.conservation}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Información detallada sobre conservación"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="about_conservation">Estado de Conservación:</label>
                      <select
                        id="about_conservation"
                        name="about_conservation"
                        value={editFormData.about_conservation}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar estado...</option>
                        <option value="LC">LC - Preocupación menor</option>
                        <option value="NT">NT - Casi amenazada</option>
                        <option value="VU">VU - Vulnerable</option>
                        <option value="EN">EN - En peligro</option>
                        <option value="CR">CR - En peligro crítico</option>
                        <option value="EW">EW - Extinta en estado silvestre</option>
                        <option value="EX">EX - Extinta</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="image">Imagen:</label>
                      <div className="image-upload-section">
                        <input
                          type="url"
                          id="image"
                          name="image"
                          value={editFormData.image}
                          onChange={handleInputChange}
                          placeholder="https://"
                        />
                        <div className="upload-divider">O</div>
                        <button
                          type="button"
                          onClick={handleImageUpload}
                          className="upload-button"
                        >
                          📁 Subir desde ordenador
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn-save" onClick={handleEditSubmit}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ButtonCreateButterfly/>
    </section>
  );
}