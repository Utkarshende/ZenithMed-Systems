import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">
    <div>
      <h1 className="text-5xl font-black text-slate-800 mb-8 tracking-tight">Contact Us</h1>
      <p className="text-slate-500 mb-12 font-medium">Need help with your order or have a bulk inquiry? Reach out to our clinical support team.</p>
      
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#10847e]"><Phone size={20}/></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Us</p><p className="font-bold text-slate-800">+91 172 400 0000</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#10847e]"><Mail size={20}/></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p><p className="font-bold text-slate-800">support@kalppharma.com</p></div>
        </div>
      </div>
    </div>

    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-4 bg-[#f3f7fb] rounded-xl outline-none text-sm font-semibold" />
        <input type="email" placeholder="Email Address" className="w-full p-4 bg-[#f3f7fb] rounded-xl outline-none text-sm font-semibold" />
        <textarea placeholder="How can we help?" className="w-full p-4 bg-[#f3f7fb] rounded-xl outline-none text-sm font-semibold h-32" />
        <button className="w-full py-4 bg-[#10847e] text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#0d6b66] transition-colors">Submit Message</button>
      </form>
    </div>
  </div>
);

export default Contact;