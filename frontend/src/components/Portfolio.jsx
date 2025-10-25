import before from "../assets/before.jpeg";
import after from "../assets/after.jpeg"

export default function Portfolio() {
  return (
    <section className="py-16" id="portfolio">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
          <div className="bg-gray-300 h-64 flex items-center justify-center rounded-lg">
            <img 
            src={before} 
            alt="image not found"
            className="object-cover w-full h-full" />
          </div>
        <p className="mt-5 font-semibold text-lg text-gray-800">Before</p>
       </div> 

       <div className="flex flex-col items-center">
          <div className="bg-gray-300 h-64 flex items-center justify-center rounded-lg">
        <img src={after} alt="image not found"
            className="object-cover w-full h-full" />     
          </div>
         <p className="mt-5 font-semibold text-lg text-gray-800">After</p>
         
            </div>   
        </div>
      </div>
    </section>
  );
}