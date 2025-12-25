import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editHotel, setEditHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  
  if (!userRole?.includes("HOTEL_MANAGER")) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Unauthorized Access
      </div>
    );
  }


  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get("/admin/hotels");
      setHotels(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contactInfo) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [name]: value },
      }));
      return;
    }

    
    if (name === "amenities" || name === "photos") {
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editHotel) {
        await axiosConfig.put(`/admin/hotels/${editHotel.id}`, formData);
      } else {
        await axiosConfig.post("/admin/hotels/create", formData);
      }

      setFormData(EMPTY_FORM);
      setEditHotel(null);
      fetchHotels();
    } catch (err) {
      alert("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };


  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setFormData({
      ...hotel,
      amenities: hotel.amenities || [],
      photos: hotel.photos || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hotel?")) return;
    await axiosConfig.delete(`/admin/hotels/${id}`);
    fetchHotels();
  };

  const handleActivate = async (id) => {
    await axiosConfig.patch(`/admin/hotels/${id}`);
    fetchHotels();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 space-y-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
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
          ].map(([field, label]) => (
            <input
              key={field}
              name={field}
              placeholder={label}
              value={
                field in formData.contactInfo
                  ? formData.contactInfo[field]
                  : formData[field]
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required={field === "name" || field === "city"}
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

      {loading ? (
        <div className="text-center text-gray-500">Loading hotels...</div>
      ) : hotels.length === 0 ? (
        <div className="text-center text-gray-500">No hotels found</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 bg-gray-200 grid grid-cols-3 gap-1">
                {(hotel.photos?.slice(0, 3) || []).map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    alt="hotel"
                    className="object-cover w-full h-full"
                  />
                ))}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">{hotel.city}</p>

                <div className="flex gap-2 flex-wrap pt-2">
                  <ActionBtn onClick={() => handleEdit(hotel)} icon={<Edit size={16} />} />
                  <ActionBtn
                    onClick={() => handleDelete(hotel.id)}
                    icon={<Trash2 size={16} />}
                    danger
                  />
                  <ActionBtn
                    onClick={() => handleActivate(hotel.id)}
                    icon={<CheckCircle size={16} />}
                    active={hotel.active}
                  />
                </div>

                {/*  ROOM MANAGEMENT ENTRY */}
                {hotel.active && (
                  <button
                    onClick={() =>
                      navigate(`/admin/hotels/${hotel.id}/rooms`)
                    }
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Manage Rooms
                  </button>
                )}
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
