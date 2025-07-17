import React, { useState } from 'react';

export default function SearchPage() {
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [chassis, setChassis] = useState('');

  const handleSearch = () => {
    // Search logic here
  };

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="mb-4">
        <input placeholder="نوع المركبة" value={type} onChange={(e) => setType(e.target.value)} className="p-2 w-full text-black" required />
        <input placeholder="اللون" value={color} onChange={(e) => setColor(e.target.value)} className="p-2 w-full text-black mt-2" required />
        <input placeholder="رقم اللوحة (اختياري)" value={plate} onChange={(e) => setPlate(e.target.value)} className="p-2 w-full text-black mt-2" />
        <input placeholder="رقم الشاسيه (اختياري)" value={chassis} onChange={(e) => setChassis(e.target.value)} className="p-2 w-full text-black mt-2" />
        <button onClick={handleSearch} className="mt-4 bg-white text-black p-2 rounded">بحث</button>
      </div>
      <div className="space-y-4">
        {/* Sample post */}
        <div className="p-4 bg-gray-800 rounded">
          <p>نوع المركبة: تويوتا</p>
          <p>اللون: أبيض</p>
          <p>رقم اللوحة: 1234</p>
          <p>رقم الشاسيه: ABC123</p>
          <div className="mt-2 flex gap-2">
            <button className="bg-green-500 px-3 py-1 rounded">تم الاسترداد</button>
            <button className="bg-red-500 px-3 py-1 rounded">إبلاغ عن خطأ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
