import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { API_ENDPOINTS } from "../api/axiosConfig";
import { Plus, Trash2, Edit, BedDouble, Users, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";


 function Rooms() {
  const { hotelId } = useParams();

  /* ======================= STATE ======================= */
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    basePrice: "",
    capacity: "",
    totalCount: "",
    amenities: [],
    photos: [],
  });

  /* ======================= API ======================= */
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/hotels/${hotelId}/rooms`);
      setRooms(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  /* ======================= FORM ======================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amenities" || name === "photos") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setEditingRoom(null);
    setFormData({
      type: "",
      basePrice: "",
      capacity: "",
      totalCount: "",
      amenities: [],
      photos: [],
    });
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await api.put(`/admin/hotels/${hotelId}/rooms/${editingRoom.id}`, formData);
      } else {
        await api.post(`/admin/hotels/${hotelId}/rooms`, formData);
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  /* ================= EDIT / DELETE ================= */
  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      ...room,
      amenities: room.amenities || [],
      photos: room.photos || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/admin/hotels/${hotelId}/rooms/${roomId}`);
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ======================= UI ======================= */
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* ============ HEADER ============ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Rooms Management</h1>
        <p className="text-gray-500">Manage rooms for this hotel</p>
      </motion.div>

      {/* ============ FORM ============ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10 max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingRoom ? "Edit Room" : "Create New Room"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="type"
            placeholder="Room Type (Deluxe, Suite)"
            value={formData.type}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="basePrice"
            type="number"
            placeholder="Base Price"
            value={formData.basePrice}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="input"
          />

          <input
            name="totalCount"
            type="number"
            placeholder="Total Rooms"
            value={formData.totalCount}
            onChange={handleChange}
            className="input"
          />

          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={formData.amenities.join(",")}
            onChange={handleChange}
            className="input md:col-span-2"
          />

          <input
            name="photos"
            placeholder="Photo URLs (comma separated)"
            value={formData.photos.join(",")}
            onChange={handleChange}
            className="input md:col-span-2"
          />

          <div className="md:col-span-2 flex gap-3 mt-4">
            <button className="btn-primary flex items-center gap-2">
              <Plus size={18} /> {editingRoom ? "Update Room" : "Add Room"}
            </button>
            {editingRoom && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* ============ ROOMS GRID ============ */}
      {loading ? (
        <p className="text-center text-gray-500">Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Images */}
              <div className="h-40 bg-gray-200 grid grid-cols-3 gap-1">
                {room.photos?.filter(Boolean).slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt="room" className="object-cover w-full h-full" />
                ))}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BedDouble size={18} /> {room.type}
                </h3>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p className="flex items-center gap-1"><IndianRupee size={14}/> {room.basePrice}</p>
                  <p className="flex items-center gap-1"><Users size={14}/> Capacity: {room.capacity}</p>
                  <p>Total Rooms: {room.totalCount}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(room)}
                    className="btn-edit"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="btn-danger"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;

