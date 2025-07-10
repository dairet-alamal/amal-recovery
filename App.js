import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import './App.css';

const firebaseConfig = {
  // ضع بيانات إعدادات Firebase هنا
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [search, setSearch] = useState({ type: '', color: '', chassis: '' });
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ type: '', color: '', chassis: '', location: '', date: '', notes: '', imageUrl: '' });
  const [view, setView] = useState('search'); // 'search' or 'add'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (view === 'search') {
      handleSearch();
    }
  }, [view]);

  async function handleSearch() {
    const carsRef = collection(db, "cars");
    let q = query(carsRef);
    if (search.type) q = query(q, where("type", ">=", search.type), where("type", "<=", search.type + ''));
    // For simplicity, search only by type. You can extend this for color, chassis.

    const querySnapshot = await getDocs(q);
    let cars = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // simple filter for color and chassis locally:
      if (
        (search.color === '' || (data.color && data.color.toLowerCase().includes(search.color.toLowerCase()))) &&
        (search.chassis === '' || (data.chassis && data.chassis.toLowerCase().includes(search.chassis.toLowerCase())))
      ) {
        cars.push({ id: doc.id, ...data });
      }
    });
    setResults(cars);
  }

  async function handleAdd() {
    if (!form.type || !form.color || !form.chassis) {
      setMessage('الرجاء تعبئة النوع، اللون، ورقم الشاسيه');
      return;
    }
    try {
      await addDoc(collection(db, "cars"), {
        ...form,
        date: form.date || new Date().toISOString().split('T')[0]
      });
      setMessage('تم نشر السيارة بنجاح');
      setForm({ type: '', color: '', chassis: '', location: '', date: '', notes: '', imageUrl: '' });
      if (view === 'search') handleSearch();
    } catch (e) {
      setMessage('حدث خطأ أثناء النشر');
    }
  }

  async function handleReport(id) {
    if (window.confirm("هل أنت متأكد من التبليغ عن هذا المنشور وإزالته؟")) {
      await deleteDoc(doc(db, "cars", id));
      handleSearch();
    }
  }

  return (
    <div className="App" style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>الأمل لاسترداد السيارات</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView('search')} disabled={view === 'search'}>بحث عن سيارة</button>
        <button onClick={() => setView('add')} disabled={view === 'add'} style={{ marginLeft: 10 }}>نشر سيارة جديدة</button>
      </div>

      {view === 'search' && (
        <div>
          <h2>بحث / Search</h2>
          <input placeholder="نوع العربة" value={search.type} onChange={e => setSearch({ ...search, type: e.target.value })} />
          <input placeholder="اللون" value={search.color} onChange={e => setSearch({ ...search, color: e.target.value })} />
          <input placeholder="رقم الشاسيه" value={search.chassis} onChange={e => setSearch({ ...search, chassis: e.target.value })} />
          <button onClick={handleSearch}>بحث</button>
          <p>{results.length} نتيجة / Results</p>
          {results.length === 0 ? (
            <p>لا توجد نتائج</p>
          ) : (
            results.map(car => (
              <div key={car.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
                <p><b>نوع:</b> {car.type}</p>
                <p><b>لون:</b> {car.color}</p>
                <p><b>شاسيه:</b> {car.chassis}</p>
                <p><b>مكان:</b> {car.location}</p>
                <p><b>تاريخ:</b> {car.date}</p>
                <p><b>ملاحظات:</b> {car.notes}</p>
                <p><button onClick={() => handleReport(car.id)}>تبليغ عن منشور خاطئ</button></p>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'add' && (
        <div>
          <h2>نشر سيارة جديدة</h2>
          <input placeholder="نوع العربة" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input placeholder="اللون" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
          <input placeholder="رقم الشاسيه" value={form.chassis} onChange={e => setForm({ ...form, chassis: e.target.value })} />
          <input placeholder="مكان السيارة" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <input placeholder="ملاحظات" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <input placeholder="رابط الصورة (اختياري)" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
          <button onClick={handleAdd}>نشر</button>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;