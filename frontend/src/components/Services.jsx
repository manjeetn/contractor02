const services = [
  { title: "Painting", desc: "Interior & Exterior professional painting." },
  { title: "Polishing", desc: "Premium wood polishing services." },
  { title: "Duco Finish", desc: "High-quality automotive-style, smooth Duco finish." },
  { title: "PU Finish", desc: "Durable PU finish for wood & furniture." },
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-300" id="services">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
