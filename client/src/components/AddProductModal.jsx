import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

function AddProductModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '', composition: '', category: 'Cardiology', dosageForm: 'Tablet', packaging: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/products', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200px] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">New Listing</h2>
                    <button onClick={onClose}><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Medicine Name</label>
                        <input required className="w-full p-3 bg-slate-100 rounded-xl" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                        <select className="w-full p-3 bg-slate-100 rounded-xl" onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option>Cardiology</option><option>Oncology</option><option>Antibiotics</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Packaging</label>
                        <input placeholder="10x10" className="w-full p-3 bg-slate-100 rounded-xl" onChange={e => setFormData({ ...formData, packaging: e.target.value })} />
                    </div>
                    <div className="col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Composition (Salt)</label>
                        <textarea className="w-full p-3 bg-slate-100 rounded-xl" onChange={e => setFormData({ ...formData, composition: e.target.value })}></textarea>
                    </div>
                    <button className="col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100">Publish to Catalog</button>
                </form>
            </div>
        </div>
    );
}

export default AddProductModal;