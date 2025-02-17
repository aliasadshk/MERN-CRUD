import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // State to store the list of items
  const [items, setItems] = useState([]);
  // State to store the input values
  const [itemInput, setItemInput] = useState({ title: "", description: "" });
  // State to track if we are editing an item
  const [editing, setEditing] = useState(false);

  // Fetch items from the server when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:4000/api/items");
      setItems(response.data);
    };

    fetchItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // Update an existing item
      const response = await axios.put(
        `http://localhost:4000/api/items/${itemInput._id}`,
        itemInput
      );
      const updatedItems = items.map((item) =>
        item._id === itemInput._id ? response.data : item
      );
      setItems(updatedItems);
      setEditing(false);
    } else {
      // Create a new item
      const response = await axios.post(
        "http://localhost:4000/api/items",
        itemInput
      );
      setItems([...items, response.data]);
    }

    // Clear the form input
    setItemInput({ title: "", description: "" });
  };

  // Handle deleting an item
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/items/${id}`);
    const remainingItems = items.filter((item) => item._id !== id);
    setItems(remainingItems);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setItemInput({ ...itemInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">CRUD App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={itemInput.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={itemInput.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditing(false);
              setItemInput({ title: "", description: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setItemInput(item); // Set input fields to item values
                    setEditing(true); // Enable editing mode
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
