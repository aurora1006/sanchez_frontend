import React, { useState, useEffect } from 'react';
import { getUsers } from './../api/personService';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import PersonaForm from './PersonaForm';

function PersonList() {

  const [showForm, setShowForm] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setCurrentPerson(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar usuario con ID: ${id}`);
    // Lógica para eliminar el usuario
  };

  const handleCreateUser = () => {
    setCurrentPerson({ name: '', email: '' });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentPerson(null);
  };

  return (
    <div className="App">
      {!showForm && (
      <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn btn-primary" onClick={handleCreateUser}>Crear Usuario</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <div className="container">
        
          
            <h1>Personas</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr>
                            <td key={user.id}>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <button className="btn btn-primary mr-2" onClick={() => handleEdit(user)}>Editar</button>
                              <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </header>
       )}
      {showForm && <PersonaForm person={currentPerson} onClose={handleCloseForm} />}
    </div>
  );
}

export default PersonList;