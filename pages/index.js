export async function getServerSideProps() {
  const res = await fetch ("http://localhost:3000/api/kullanicilar");
  const data = await res.json();


  return {
    props: {
      kullanicilar : data.data,
    },
  };
  
}

export default function Home({kullanicilar}){
  return(
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kullanici Listesi</h1>
      <ul className="space-y-2">
        {kullanicilar.map((k,i)=>(
          <li key={i} className="border p-2 rounded bg-gray-100">
            <strong>{k.ad}</strong> - {k.email}
          </li>
        ))}
      </ul>
    </main>
  )
}

