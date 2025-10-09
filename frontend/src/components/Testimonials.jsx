
const testimonials = [
  { name: "Rahul Sharma", text: "Amazing work! My house looks brand new." },
  { name: "Priya Singh", text: "The polishing was perfect. Highly recommend!" },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white shadow-md p-6 rounded-xl">
              <p className="italic mb-4">"{t.text}"</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}