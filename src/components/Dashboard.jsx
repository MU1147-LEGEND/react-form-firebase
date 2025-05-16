// Dashboard.js
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase"; // তোমার config অনুযায়ী path adjust করো

export default function Dashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, "submissions"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSubmissions(data);
        });

        return () => unsubscribe(); // clean up
    }, []);

    const getPreview = (message) => {
        return (
            message.split(" ").slice(0, 3).join(" ") +
            (message.split(" ").length > 3 ? "..." : "")
        );
    };
    const trimAddress = (address) => {
        return (
            address.split(" ").slice(0, 2).join(" ") +
            (address.split(" ").length > 2 ? "..." : "")
        );
    };

    return (
        <div className="w-full mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">ড্যাশবোর্ড</h1>
            <div className="overflow-auto shadow">
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">নাম</th>
                            <th className="p-3 border">ইমেইল</th>
                            <th className="p-3 border">ফোন</th>
                            <th className="p-3 border">বিভাগ</th>
                            <th className="p-3 border">মেসেজ</th>
                            <th className="p-3 border">লিঙ্গ</th>
                            <th className="p-3 border">জন্ম তারিখ</th>
                            <th className="p-3 border">ঠিকানা</th>
                            <th className="p-3 border">সাবমিটের সময়</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{item?.name}</td>
                                <td className="p-2 border">{item?.email}</td>
                                <td className="p-2 border">{item?.phone}</td>
                                <td className="p-2 border">
                                    {item.department}
                                </td>
                                <td className="p-2">
                                    <span
                                        title="Click to show the message"
                                        className="text-blue-600 cursor-pointer underline"
                                        onClick={() =>
                                            setSelectedMessage(item.message)
                                        }
                                    >
                                        {getPreview(item.message)}
                                    </span>
                                </td>
                                <td className="p-2 border">{item?.gender}</td>
                                <td className="p-2 border">
                                    {item?.birthDate || "N/A"}
                                </td>
                                <td className="p-2 border">
                                    {trimAddress(item?.address || "N/A")}
                                </td>
                                <td className="p-2 border">
                                    {item.createdAt
                                        ?.toDate?.()
                                        .toLocaleString("bn-BD") || "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer "
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-semibold mb-2">
                                পুরো মেসেজ
                            </h2>
                            <p className="text-gray-800">{selectedMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
