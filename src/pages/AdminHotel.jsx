import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { Edit, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EMPTY_FORM = {
  name: "",
  city: "",
  contactInfo: {
    address: "",
    email: "",
    phoneNumber: "",
    location: "",
  },
  amenities: [],
  photos: [],
};

export default function AdminHotel() {
  const { userRole } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editHotel, setEditHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ================= ROLE GUARD ================= */
  if (!userRole?.includes("HOTEL_MANAGER")) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Unauthorized Access
      </div>
    );
  }

  /* ================= FETCH ================= */
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get("/admin/hotels");
      setHotels(res.data?.data || []);
    } catch {
      alert("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.contactInfo) {
      setFormData((p) => ({
        ...p,
        contactInfo: { ...p.contactInfo, [name]: value },
      }));
    } else if (name === "amenities" || name === "photos") {
      setFormData((p) => ({
        ...p,
        [name]: value.split(",").map((v) => v.trim()).filter(Boolean),
      }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      editHotel
        ? await axiosConfig.put(`/admin/hotels/${editHotel.id}`, formData)
        : await axiosConfig.post("/admin/hotels/create", formData);

      setFormData(EMPTY_FORM);
      setEditHotel(null);
      fetchHotels();
    } catch {
      alert("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= ACTIONS ================= */
  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setFormData(hotel);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this hotel?")) return;
    await axiosConfig.delete(`/admin/hotels/${id}`);
    fetchHotels();
  };

  const handleActivate = async (id) => {
    await axiosConfig.patch(`/admin/hotels/${id}`);
    fetchHotels();
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* FORM */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editHotel ? "Edit Hotel" : "Create Hotel"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {[
            ["name", "Hotel Name"],
            ["city", "City"],
            ["address", "Address"],
            ["email", "Email"],
            ["phoneNumber", "Phone"],
            ["location", "Location"],
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              value={
                name in formData.contactInfo
                  ? formData.contactInfo[name]
                  : formData[name]
              }
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          ))}

          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={formData.amenities.join(", ")}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />
          <input
            name="photos"
            placeholder="Photo URLs (comma separated)"
            value={formData.photos.join(", ")}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            disabled={submitting}
            className="bg-red-600 text-white py-3 rounded-lg md:col-span-2 flex justify-center"
          >
            {submitting ? <Loader2 className="animate-spin" /> : "Save Hotel"}
          </button>
        </form>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : hotels.length === 0 ? (
        <div className="text-center text-gray-500">No hotels found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow">
              <div className="h-40 bg-gray-200 grid grid-cols-3 gap-1">
                {(hotel.photos?.slice(0, 3) || []).map((p, i) => (
                  <img key={i} src={p} className="object-cover w-full h-full" />
                ))}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">{hotel.city}</p>

                <div className="flex gap-2 flex-wrap pt-2">
                  <ActionBtn onClick={() => handleEdit(hotel)} icon={<Edit size={16} />} />
                  <ActionBtn onClick={() => handleDelete(hotel.id)} icon={<Trash2 size={16} />} danger />
                  <ActionBtn
                    onClick={() => handleActivate(hotel.id)}
                    icon={<CheckCircle size={16} />}
                    active={hotel.active}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ActionBtn = ({ icon, onClick, danger, active }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1
      ${danger && "bg-red-600 text-white"}
      ${active && "bg-green-600 text-white"}
      ${!danger && !active && "bg-gray-200"}
    `}
  >
    {icon}
  </button>
);
