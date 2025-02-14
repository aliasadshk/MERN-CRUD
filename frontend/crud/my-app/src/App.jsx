import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);

  // Fetch items from the server when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      {
        // Send GET request to the server
        const response = await axios.get("http://localhost:4000/api/items");
        // Update the items state with data from the server
        setItems(response.data);
      }
    };

    // Call the fetchItems function
    fetchItems();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Determine if we're creating a new item or updating an existing one
      if (editing) {
        // Send PUT request to update the item
        const response = await axios.put(
          `http://localhost:4000/api/items/${itemInput._id}`,
          itemInput
        );
        // Update the item in the items state
        const updatedItems = items.map((item) =>
          item._id === itemInput._id ? response.data : item
        );
        setItems(updatedItems);
        setEditing(false); // Reset editing mode
      } else {
        // Send POST request to create a new item
        const response = await axios.post(
          "http://localhost:4000/api/items",
          itemInput
        );
        // Add the new item to the items state
        setItems([...items, response.data]);
      }

      // Clear the form input after submission
      setItemInput({ title: "", description: "" });
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  // Handle deleting an item
  const handleDelete = async (id) => {
    {
      // Send DELETE request to remove the item
      await axios.delete(`http://localhost:4000/api/items/${id}`);
      // Remove the item from the items state
      const filteredItems = items.filter((item) => item._id !== id);
      setItems(filteredItems);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">CRUD App</h1>

      {/* Form to add/edit items */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            required
            value={itemInput.title}
            onChange={(e) =>
              setItemInput({ ...itemInput, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            required
            value={itemInput.description}
            onChange={(e) =>
              setItemInput({ ...itemInput, description: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? "Update Item" : "Add Item"}
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

      <h2>Items List</h2>
      <ul className="list-group">
        {/* Map over items and render each */}
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
