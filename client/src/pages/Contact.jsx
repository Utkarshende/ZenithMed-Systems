import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 py-24 px-6 text-center text-white">
        <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">Contact <span className="text-blue-500">Global HQ</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium">
          Have questions about our export certifications or bulk manufacturing? Our team of experts is ready to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 transition-transform hover:-translate-y-2">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
              <Phone size={24} />
            </div>
            <h3 className="font-black text-xl text-slate-900 mb-2">Call Us</h3>
            <p className="text-slate-500 font-medium">+91 (172) 456-7890</p>
            <p className="text-slate-500 font-medium">+91 98765-43210</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 transition-transform hover:-translate-y-2">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
              <Mail size={24} />
            </div>
            <h3 className="font-black text-xl text-slate-900 mb-2">Email Support</h3>
            <p className="text-slate-500 font-medium">exports@nexuspharma.com</p>
            <p className="text-slate-500 font-medium">info@nexuspharma.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Send a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            <input type="email" placeholder="Business Email" className="p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            <div className="md:col-span-2">
              <input type="text" placeholder="Subject (e.g. Export Inquiry)" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
            <div className="md:col-span-2">
              <textarea placeholder="Tell us about your requirements..." className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] font-medium"></textarea>
            </div>
            <button className="bg-blue-600 text-white py-5 px-10 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest">
              Send Message <Send size={20} />
            </button>
          </form>
          <div className="max-w-7xl mx-auto px-6 mt-16 overflow-hidden rounded-[3rem] border-8 border-white shadow-2xl">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.565!2d76.7!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzAwLjAiTiA3NsKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
    width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy">
  </iframe>
</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;