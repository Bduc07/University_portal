import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col p-10 gap-8">
      <div className="bg-[#1F386B] text-white p-8 rounded-lg flex flex-col gap-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Reach out to us</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Form */}
          <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-6 flex-1">
            <label htmlFor="full-name" className="text-gray-700 text-sm">
              Enter your full name
            </label>
            <input
              type="text"
              id="full-name"
              className="p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="email" className="text-gray-700 text-sm">
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              className="p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="number" className="text-gray-700 text-sm">
              Enter your number
            </label>
            <input
              type="tel"
              id="number"
              className="p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="query" className="text-gray-700 text-sm">
              Enter your query
            </label>
            <textarea
              id="query"
              className="p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            ></textarea>

            <button className="bg-[#1F386B] text-white py-2 px-6 rounded-lg w-32 self-center mt-4 hover:bg-blue-700">
              Submit
            </button>
          </div>

          {/* Right Side: Address */}
          <div className="flex flex-col items-start w-1/3 gap-4">
            <h2 className="text-xl font-semibold mb-4">Find us</h2>
            <div className="bg-[#1F386B] text-white p-6 rounded-lg w-full border-2 border-white">
              <p>📍 Kamal Marg, Kamal Pokhari, Kathmandu, Nepal</p>
              <p>📞 +977 9863900249</p>
              <p>📞 +977 9800099989</p>
              <p>📞 01-4900012</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
