import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  query,
  where
} from 'firebase/firestore';

export default function SearchPage() {
  const [vehicles, setVehicles] = useState([]);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [chassis, setChassis] = useState('');

  const fetchVehicles = async () => {
    const postsRef = collection(db, 'posts');
    let q = query(postsRef);

    if (type) q = query(q, where('type', '==', type));
    if (color) q = query(q, where('color', '==', color));
    if (plate) q = query(q, where('plate', '==', plate));
    if (chassis) q = query(q, where('chassis', '==', chassis));

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVehicles(data);
  };

  const handleRecover = async (id, data) => {
    await setDoc(doc(db, 'recovered', id), data);
    await deleteDoc(doc(db, 'posts', id));
    fetchVehicles();
  };

  const handleError = async (id, data) => {
    await setDoc(doc(db, 'errors', id), data);
    await deleteDoc(doc(db, 'posts', id));
    fetchVehicles();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="mb-4 space-y-2">
        <input placeholder="نوع المركبة" value={type} onChange={(e) => setType(e.target.value)} className="p-2 w-full text-black" required />
        <input placeholder="اللون" value={color} onChange={(e) => setColor(e.target.value)} className="p-2 w-full text-black" required />
        <input placeholder="رقم اللوحة (اختياري)" value={plate} onChange={(e) => setPlate(e.target.value)} className="p-2 w-full text-black" />
        <input placeholder="رقم الشاسيه (اختياري)" value={chassis} onChange={(e) => setChassis(e.target.value)} className="p-2 w-full text-black" />
        <button onClick={fetchVehicles} className="mt-2 bg-white text-black p-2 rounded">بحث</button>
      </div>

      <div className="space-y-4">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="p-4 bg-gray-800 rounded">
            <p>نوع المركبة: {vehicle.type}</p>
            <p>اللون: {vehicle.color}</p>
            {vehicle.plate && <p>رقم اللوحة: {vehicle.plate}</p>}
            {vehicle.chassis && <p>رقم الشاسيه: {vehicle.chassis}</p>}
            <div className="mt-2 flex gap-2">
              <button
                className="bg-green-500 px-3 py-1 rounded"
                onClick={() => handleRecover(vehicle.id, vehicle)}
              >
                تم الاسترداد
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded"
                onClick={() => handleError(vehicle.id, vehicle)}
              >
                إبلاغ عن خطأ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
