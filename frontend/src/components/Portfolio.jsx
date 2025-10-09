
export default function Portfolio() {
  return (
    <section className="py-16" id="portfolio">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-300 h-64 flex items-center justify-center rounded-lg">
            Before Image
          </div>
          <div className="bg-gray-300 h-64 flex items-center justify-center rounded-lg">
            After Image
          </div>
        </div>
      </div>
    </section>
  );
}