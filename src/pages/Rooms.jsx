import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import {
  Plus,
  Trash2,
  Edit,
  BedDouble,
  Users,
  IndianRupee,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axiosConfig";

export default function Rooms() {
  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [form, setForm] = useState({
    type: "",
    basePrice: "",
    capacity: "",
    totalCount: "",
    amenities: "",
    photos: ""
  });

  /* ================= API ================= */
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/hotels/${hotelId}/rooms`);
      setRooms(res.data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  /* ================= FORM ================= */
  const resetForm = () => {
    setEditingRoom(null);
    setForm({
      type: "",
      basePrice: "",
      capacity: "",
      totalCount: "",
      amenities: "",
      photos: ""
    });
    setOpenForm(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: form.type,
      basePrice: Number(form.basePrice),
      capacity: Number(form.capacity),
      totalCount: Number(form.totalCount),
      amenities: form.amenities.split(",").map(a => a.trim()),
      photos: form.photos.split(",").map(p => p.trim())
    };

    try {
      if (editingRoom) {
        await api.put(
          `/admin/hotels/${hotelId}/rooms/${editingRoom.id}`,
          payload
        );
      } else {
        await api.post(`/admin/hotels/${hotelId}/rooms`, payload);
      }
      resetForm();
      fetchRooms();
    } catch (e) {
      alert("Operation failed");
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setForm({
      type: room.type,
      basePrice: room.basePrice,
      capacity: room.capacity,
      totalCount: room.totalCount,
      amenities: room.amenities?.join(", ") || "",
      photos: room.photos?.join(", ") || ""
    });
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this room?")) return;
    await api.delete(`/admin/hotels/${hotelId}/rooms/${id}`);
    fetchRooms();
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Rooms</h1>
          <p className="text-gray-500 text-sm">
            Manage rooms for this hotel
          </p>
        </div>
        <button
          onClick={() => setOpenForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          <Plus size={18} /> Add Room
        </button>
      </div>

      {/* ROOMS GRID */}
      {loading ? (
        <p className="text-center text-gray-500">Loading rooms…</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500">
          No rooms added yet
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <div className="h-40 bg-gray-200 grid grid-cols-3 gap-1">
                {(room.photos || []).slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>

              <div className="p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <BedDouble size={16} /> {room.type}
                </h3>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p className="flex items-center gap-1">
                    <IndianRupee size={14} /> {room.basePrice}
                  </p>
                  <p className="flex items-center gap-1">
                    <Users size={14} /> Capacity {room.capacity}
                  </p>
                  <p>Total Rooms: {room.totalCount}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* FORM DRAWER */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-xl p-6 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">
                {editingRoom ? "Edit Room" : "Add Room"}
              </h2>
              <X onClick={resetForm} className="cursor-pointer" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["type", "basePrice", "capacity", "totalCount"].map(f => (
                <input
                  key={f}
                  name={f}
                  placeholder={f}
                  value={form[f]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              ))}

              <textarea
                name="amenities"
                placeholder="Amenities (comma separated)"
                value={form.amenities}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="photos"
                placeholder="Photo URLs (comma separated)"
                value={form.photos}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <button className="w-full bg-red-600 text-white py-3 rounded-lg">
                {editingRoom ? "Update Room" : "Create Room"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
