import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBirthdayCake, FaPhone, FaUserCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import api from "./api/axios";

/* Types */
interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile_picture_url: string | null;
  bio: string;
  date_of_birth: string | null; // ISO yyyy-mm-dd
}

interface Address {
  id: number;
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code?: string;
  is_default: boolean;
}

/* Countries (short list) */
const countries = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
];

const getAuthConfig = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("access_token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
};

export default function Profile(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    date_of_birth: "", // ISO yyyy-mm-dd
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "NG",
    postal_code: "",
    is_default: false,
  });

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- API calls ---------- */
  const fetchProfile = async () => {
    setLoadingProfile(true);
    setMessage(null);
    try {
      const cfg = getAuthConfig();
      const res = await api.get("/auth/profile/", cfg);
      setUser(res.data);
      setFormData({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        bio: res.data.bio || "",
        date_of_birth: res.data.date_of_birth || "",
      });
      setPreviewUrl(res.data.profile_picture_url || null);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } else {
        setMessage("Could not load profile. Please refresh or login again.");
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const cfg = getAuthConfig();
      const res = await api.get("/auth/addresses/", cfg);
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  /* ---------- Profile handlers ---------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    // Basic DOB validation: not in future
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob > today) {
        setMessage("Date of birth cannot be in the future.");
        setSavingProfile(false);
        return;
      }
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) data.append(k, String(v));
      });
      if (profilePicture) data.append("profile_picture", profilePicture);

      const cfg = {
        ...(getAuthConfig() || {}),
        headers: { "Content-Type": "multipart/form-data", ...(getAuthConfig()?.headers || {}) },
      };
      const res = await api.patch("/auth/profile/", data, cfg);
      setUser(res.data);
      setEditing(false);
      setMessage("Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err: any) {
      console.error("Update profile error:", err);
      setMessage(err?.response?.data?.error || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ---------- Address handlers ---------- */
  const openAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      full_name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "NG",
      postal_code: "",
      is_default: false,
    });
    setShowAddressForm(true);
    setEditing(false);
    setTimeout(() => {
      const el = document.getElementById("address-form");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      full_name: address.full_name || "",
      phone: address.phone || "",
      line1: address.line1 || "",
      line2: address.line2 || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "NG",
      postal_code: address.postal_code || "",
      is_default: !!address.is_default,
    });
    setShowAddressForm(true);
    setEditing(false);
    setTimeout(() => {
      const el = document.getElementById("address-form");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setAddressForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const saveAddress = async () => {
    try {
      const cfg = getAuthConfig();
      if (editingAddress) {
        await api.patch(`/auth/addresses/${editingAddress.id}/`, addressForm, cfg);
      } else {
        await api.post("/auth/addresses/", addressForm, cfg);
      }
      await fetchAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);
      setMessage("Address saved");
    } catch (err) {
      console.error("Failed to save address:", err);
      setMessage("Failed to save address");
    }
  };

  const deleteAddress = async (id: number) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      const cfg = getAuthConfig();
      await api.delete(`/auth/addresses/${id}/`, cfg);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      setMessage("Address deleted");
    } catch (err) {
      console.error("Failed to delete address:", err);
      setMessage("Failed to delete address");
    }
  };

  const setDefaultAddress = async (id: number) => {
    try {
      const cfg = getAuthConfig();
      await api.patch(`/auth/addresses/${id}/`, { is_default: true }, cfg);
      await fetchAddresses();
      setMessage("Default address updated");
    } catch (err) {
      console.error("Failed to set default:", err);
      setMessage("Failed to set default address");
    }
  };

  /* ---------- Utilities ---------- */
  const formatDOB = (iso?: string | null) => {
    if (!iso) return "Not provided";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return iso;
    }
  };

  if (loadingProfile && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header / hero */}
          <div className="bg-rose-50 px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-rose-200 flex items-center justify-center text-2xl text-rose-900 font-bold overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  (user?.first_name?.[0] || user?.username?.[0] || "U")
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-rose-900">{user?.first_name} {user?.last_name}</h1>
                <p className="text-sm text-gray-600">@{user?.username} • <span className="text-rose-700">{user?.email}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEditing((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-rose-200 text-rose-700 rounded shadow-sm hover:bg-rose-50 transition"
                aria-pressed={editing}
              >
                <FaEdit /> {editing ? "Close" : "Edit Profile"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-6">
            {message && (
              <div role="status" className={`p-3 rounded mb-4 ${message.toLowerCase().includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column: overview / contact */}
              <div className="md:col-span-1 bg-white p-4 rounded shadow-sm border">
                <h2 className="font-semibold text-rose-900 mb-3">Profile Info</h2>

                <div className="flex items-center gap-3 mb-3">
                  <FaPhone className="text-rose-600" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium text-gray-900">{user?.phone || "Not provided"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <FaBirthdayCake className="text-rose-600" />
                  <div>
                    <div className="text-sm text-gray-600">Date of Birth</div>
                    <div className="font-medium text-gray-900">{formatDOB(user?.date_of_birth)}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm text-gray-600 mb-2">Bio</h3>
                  <p className="text-gray-800 text-sm">{user?.bio || "No bio set"}</p>
                </div>
              </div>

              {/* Right column: main content */}
              <div className="md:col-span-2 space-y-6">
                {/* Edit profile form */}
                {editing ? (
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm border">
                    <h2 className="text-lg font-semibold text-rose-900 mb-4">Edit Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <label className="block">
                        <span className="text-sm text-gray-700">First name</span>
                        <input name="first_name" value={formData.first_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                      </label>
                      <label className="block">
                        <span className="text-sm text-gray-700">Last name</span>
                        <input name="last_name" value={formData.last_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <label className="block">
                        <span className="text-sm text-gray-700">Email</span>
                        <input name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                      </label>
                      <label className="block">
                        <span className="text-sm text-gray-700">Phone</span>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <label className="block">
                        <span className="text-sm text-gray-700">Date of birth</span>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded"
                          aria-label="Date of birth"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm text-gray-700">Profile picture</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-1">Bio</label>
                      <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="w-full px-4 py-2 border rounded" rows={4} />
                    </div>

                    <div className="flex gap-3">
                      <button type="submit" disabled={savingProfile} className="bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 disabled:opacity-60">
                        {savingProfile ? "Saving..." : "Save changes"}
                      </button>
                      <button type="button" onClick={() => setEditing(false)} className="bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-white p-6 rounded shadow-sm border">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-semibold text-rose-900">Account</h2>
                      <div className="text-sm text-gray-600">Member since: <span className="font-medium text-gray-800">{user ? new Date(user.id ? 0 : Date.now()).toLocaleDateString() : ""}</span></div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-2">Email</div>
                      <div className="font-medium text-gray-900">{user?.email}</div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm text-gray-600 mb-2">Manage Addresses</h3>
                      <div className="space-y-4">
                        {addresses.length === 0 ? (
                          <p className="text-gray-500">No addresses yet. Add one to speed checkout.</p>
                        ) : (
                          addresses.map((addr) => (
                            <div key={addr.id} className="p-4 border rounded flex justify-between items-start">
                              <div>
                                <div className="font-semibold">{addr.full_name} {addr.is_default && <span className="ml-2 text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Default</span>}</div>
                                <div className="text-gray-700 text-sm">{addr.line1}</div>
                                {addr.line2 && <div className="text-gray-700 text-sm">{addr.line2}</div>}
                                <div className="text-gray-700 text-sm">{addr.city}, {addr.state} {addr.postal_code}</div>
                                <div className="text-gray-700 text-sm">{addr.country}</div>
                                <div className="text-gray-700 text-sm">{addr.phone}</div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <button type="button" onClick={() => openEditAddress(addr)} className="text-rose-600 hover:underline flex items-center gap-2">
                                  <FaEdit /> Edit
                                </button>
                                <div className="flex gap-2">
                                  <button type="button" onClick={() => setDefaultAddress(addr.id)} className="text-sm text-gray-600 hover:underline">Set Default</button>
                                  <button type="button" onClick={() => deleteAddress(addr.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="mt-4">
                        <button type="button" onClick={openAddAddress} className="text-rose-600 font-semibold hover:underline">+ Add Address</button>
                      </div>

                      {/* Address form (independent) */}
                      {showAddressForm && (
                        <div id="address-form" className="mt-4 p-4 border rounded bg-gray-50">
                          <h4 className="font-semibold mb-3">{editingAddress ? "Edit Address" : "Add Address"}</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input name="full_name" value={addressForm.full_name} onChange={handleAddressChange} placeholder="Full name" className="px-3 py-2 border rounded" />
                            <input name="phone" value={addressForm.phone} onChange={handleAddressChange} placeholder="Phone" className="px-3 py-2 border rounded" />
                            <input name="line1" value={addressForm.line1} onChange={handleAddressChange} placeholder="Address line 1" className="px-3 py-2 border rounded md:col-span-2" />
                            <input name="line2" value={addressForm.line2} onChange={handleAddressChange} placeholder="Address line 2" className="px-3 py-2 border rounded md:col-span-2" />
                            <input name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="px-3 py-2 border rounded" />
                            <input name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="px-3 py-2 border rounded" />
                            <input name="postal_code" value={addressForm.postal_code} onChange={handleAddressChange} placeholder="Postal code" className="px-3 py-2 border rounded" />
                            <select name="country" value={addressForm.country} onChange={handleAddressChange} className="px-3 py-2 border rounded">
                              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                            </select>
                            <label className="flex items-center gap-2">
                              <input type="checkbox" name="is_default" checked={addressForm.is_default} onChange={handleAddressChange} />
                              <span className="text-sm">Set as default</span>
                            </label>
                          </div>

                          <div className="mt-3 flex gap-3">
                            <button type="button" onClick={saveAddress} className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700">Save</button>
                            <button type="button" onClick={() => { setShowAddressForm(false); setEditingAddress(null); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}