import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { X, Edit, Trash2, CheckCircle } from "lucide-react";

export default function HotelDashboard() {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    contactInfo: { address: "", email: "", phoneNumber: "", location: "" },
    amenities: [],
    photos: [],
  });
  const [editHotel, setEditHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= Fetch Hotels =================
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get("/admin/hotels");
      setHotels(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // ================= Handle Form Changes =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["address", "email", "phoneNumber", "location"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [name]: value },
      }));
    } else if (name === "photos" || name === "amenities") {
      setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= Create / Update Hotel =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editHotel) {
        await axiosConfig.put(`/admin/hotels/${editHotel.id}`, formData);
        setEditHotel(null);
      } else {
        await axiosConfig.post("/admin/hotels/create", formData);
      }
      setFormData({
        name: "",
        city: "",
        contactInfo: { address: "", email: "", phoneNumber: "", location: "" },
        amenities: [],
        photos: [],
      });
      fetchHotels();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error!");
    }
  };

  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setFormData(hotel);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axiosConfig.delete(`/admin/hotels/${hotelId}`);
      fetchHotels();
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  const handleActivate = async (hotelId) => {
    try {
      await axiosConfig.patch(`/admin/hotels/${hotelId}`);
      fetchHotels();
    } catch (err) {
      console.error(err);
      alert("Activate failed!");
    }
  };

  // ================= Render Hotel Card =================
  const renderHotelCard = (hotel) => {
    const photos = hotel.photos?.filter((p) => p && p.trim() !== "") || [];
    const mainImages = photos.length > 0 ? photos.slice(0, 3) : [];

    return (
      <div
        key={hotel.id}
        className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
      >
        {/* Image Grid */}
        <div className="h-48 grid grid-cols-3 gap-1 bg-gray-100">
          {mainImages.length > 0
            ? mainImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              ))
            : [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-full h-full flex items-center justify-center text-gray-400"
                >
                  No image
                </div>
              ))}
        </div>

        {/* Hotel Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{hotel.name || "Unnamed Hotel"}</h3>
          <p className="text-gray-500 text-sm">{hotel.city || "Unknown City"}</p>
          {hotel.amenities?.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">{hotel.amenities.join(", ")}</p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            <button
              onClick={() => handleEdit(hotel)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={() => handleDelete(hotel.id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              onClick={() => handleActivate(hotel.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                hotel.active
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              <CheckCircle size={16} />
              {hotel.active ? "Active" : "Activate"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      {/* Create / Edit Form */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg mb-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editHotel ? "Edit Hotel" : "Create New Hotel"}
        </h2>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.contactInfo.address}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.contactInfo.email}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.contactInfo.phoneNumber}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location Coordinates"
            value={formData.contactInfo.location}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={formData.amenities.join(",")}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="photos"
            placeholder="Photo URLs (comma separated)"
            value={formData.photos.join(",")}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-md transition"
          >
            {editHotel ? "Update Hotel" : "Create Hotel"}
          </button>
        </form>
      </div>

      {/* Hotels Grid */}
      {loading ? (
        <div className="text-center text-gray-500">Loading hotels...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => renderHotelCard(hotel))}
        </div>
      )}
    </div>
  );
}
