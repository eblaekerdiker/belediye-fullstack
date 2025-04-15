import { use, useState } from "react";

export async function getServerSideProps() {
  
  const res = await fetch("http://localhost:3000/api/kullanicilar");
  const data = await res.json();

  return {
    props: {
      kullanicilar: data.data,
    },
  };
}

export default function Home({kullanicilar}) {

  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    const res = await fetch("/api/kullanicilar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ad, email }),
    })
      .then((res) => {
        console.log("🎯 İstek gönderildi! Status:", res.status);
        return res.json();
      })
      .catch((err) => {
        console.error("❌ FETCH HATASI:", err);
      });
    
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Bu kullaniciyi silmek istiyor musun?");
    if (!confirmed) return;

    const res = await fetch("/api/kullanicilar", {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });

    if(res.ok){
      window.location.reload();
    }
  };

  return(
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kullanici Listesi</h1>
      <ul className="space-y-2 mb-6">
        {kullanicilar.map((k,i) => (
          <li key={i} className="border p-2 rounded bg-gray-100">
            <strong>{k.ad}</strong> - {k.email}
            <button onClick={() => handleDelete(k._id)} className="text-red-600 hover:underline px-4">
              Sil
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
        type="text"
        placeholder="Ad"
        className="w-full border px-4 py-2 rounded"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
        required
        />
         <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ekle</button>
      </form>
    </main>
  );
}
