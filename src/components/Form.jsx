import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "বিভাগ নির্বাচন করুন *",
        message: "",
        address: "",
        birthDate: "",
        gender: "",
        image: null, // not uploaded to Firebase yet
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            phone,
            department,
            message,
            address,
            birthDate,
            gender,
        } = formData;

        try {
            await addDoc(collection(db, "submissions"), {
                name,
                email,
                phone,
                department,
                message,
                address,
                birthDate,
                gender,
                createdAt: new Date(),
            });

            toast.success("✅ সাবমিট সফল হয়েছে!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                department: "",
                message: "",
                address: "",
                birthDate: "",
                gender: "",
                image: null,
            });
        } catch (err) {
            toast.error("❌ সমস্যা হয়েছে: " + err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 w-full lg:w-3/4 mx-auto"
        >
            <input
                minLength={3}
                maxLength={20}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="নাম *"
                className="w-full border p-2"
                required
            />
            <input
                minLength={8}
                maxLength={25}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ইমেইল *"
                className="w-full border p-2"
                required
            />
            <input
                minLength={11}
                maxLength={14}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="ফোন নাম্বার *"
                className="w-full border p-2"
                required
            />
            <select
                name="department"
                // value={formData.department}
                defaultValue={formData.department}
                onChange={handleChange}
                className="w-full border p-2"
            >
                <option value="বিভাগ নির্বাচন করুন *" disabled>
                    বিভাগ নির্বাচন করুন (Optional)
                </option>
                <option value="সাধারণ">সাধারণ</option>
                <option value="আইটি">আইটি</option>
                <option value="অ্যাকাউন্টস">অ্যাকাউন্টস</option>
                <option value="ম্যানেজমেন্ট">ম্যানেজমেন্ট</option>
            </select>

            <textarea
                minLength={10}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="মেসেজ *"
                className="w-full border p-2"
                required
            />
            <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="আপনার ঠিকানা *"
                className="w-full border p-2"
                required
            />
            <label htmlFor="birth">Date of Birth (Optional)</label>
            <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border p-2"
            />
            <label htmlFor="gender" className="font-semibold text-xl pb-1">
                Gender:
            </label>
            <div className="flex gap-4">
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="পুরুষ"
                        checked={formData.gender === "পুরুষ"}
                        onChange={handleChange}
                    />
                    <span className="ml-1">পুরুষ</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="মহিলা"
                        checked={formData.gender === "মহিলা"}
                        onChange={handleChange}
                    />
                    <span className="ml-1">মহিলা</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="অন্যান্য"
                        checked={formData.gender === "অন্যান্য"}
                        onChange={handleChange}
                    />
                    <span className="ml-1">অন্যান্য</span>
                </label>
            </div>

            <button
                type="submit"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                সাবমিট করুন
            </button>
        </form>
    );
}
