import React, { useState, useEffect } from 'react';

const PersonaForm = ({ person, onClose }) => {

  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    if (person) {
      setFormData(person);
    }
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a tu backend o manejarlos según necesites
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Formulario de Persona</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Guardar</button>
              <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaForm;
