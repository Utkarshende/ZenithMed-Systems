const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

const products = [
	{
		name: 'Panadol Advance',
		composition: 'Paracetamol 500 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 10 x 10 tablets',
		category: 'Analgesic',
		description: 'Fast-acting analgesic and antipyretic for mild to moderate pain.'
	},
	{
		name: 'Calpol Infant Drops',
		composition: 'Paracetamol 120 mg/5 mL',
		dosageForm: 'Syrup',
		packaging: 'Bottle 30 mL',
		category: 'Analgesic',
		description: 'Pediatric formulation for fever and pain relief.'
	},
	{
		name: 'Amoxil',
		composition: 'Amoxicillin 500 mg',
		dosageForm: 'Capsule',
		packaging: 'Box of 20 capsules',
		category: 'Antibiotics',
		description: 'Broad-spectrum penicillin antibiotic for bacterial infections.'
	},
	{
		name: 'Zithromax',
		composition: 'Azithromycin 250 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 6 tablets',
		category: 'Antibiotics',
		description: 'Macrolide antibiotic commonly used for respiratory infections.'
	},
	{
		name: 'Ciprobay',
		composition: 'Ciprofloxacin 500 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 10 tablets',
		category: 'Antibiotics',
		description: 'Fluoroquinolone antibiotic for complicated infections.'
	},
	{
		name: 'Lipitor',
		composition: 'Atorvastatin 20 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 30 tablets',
		category: 'Cardiology',
		description: 'HMG-CoA reductase inhibitor for cholesterol management.'
	},
	{
		name: 'Plavix',
		composition: 'Clopidogrel 75 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 30 tablets',
		category: 'Cardiology',
		description: 'Antiplatelet agent used to reduce risk of stroke and MI.'
	},
	{
		name: 'Glucophage',
		composition: 'Metformin 500 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 60 tablets',
		category: 'Endocrinology',
		description: 'First-line oral antidiabetic for type 2 diabetes mellitus.'
	},
	{
		name: 'Ventolin',
		composition: 'Salbutamol 100 mcg/actuation',
		dosageForm: 'Other',
		packaging: 'Inhaler 200 actuations',
		category: 'Respiratory',
		description: 'Short-acting bronchodilator for relief of bronchospasm.'
	},
	{
		name: 'Lantus',
		composition: 'Insulin glargine 100 U/mL',
		dosageForm: 'Injection',
		packaging: 'Vial 10 mL',
		category: 'Endocrinology',
		description: 'Long-acting basal insulin for glycemic control.'
	},
	{
		name: 'Keytruda',
		composition: 'Pembrolizumab 100 mg',
		dosageForm: 'Injection',
		packaging: 'Vial 100 mg',
		category: 'Oncology',
		description: 'Monoclonal antibody for multiple cancer indications (PD-1 inhibitor).'
	},
	{
		name: 'Opdivo',
		composition: 'Nivolumab 240 mg/24 mL',
		dosageForm: 'Injection',
		packaging: 'Vial 240 mg',
		category: 'Oncology',
		description: 'Immune checkpoint inhibitor used in advanced cancers.'
	},
	{
		name: 'Herceptin',
		composition: 'Trastuzumab 150 mg',
		dosageForm: 'Injection',
		packaging: 'Vial 150 mg',
		category: 'Oncology',
		description: 'Monoclonal antibody for HER2-positive breast cancer.'
	},
	{
		name: 'Nexium',
		composition: 'Esomeprazole 40 mg',
		dosageForm: 'Capsule',
		packaging: 'Box of 14 capsules',
		category: 'Gastroenterology',
		description: 'Proton pump inhibitor for GERD and peptic ulcer disease.'
	},
	{
		name: 'Diflucan',
		composition: 'Fluconazole 150 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 1 tablet',
		category: 'Anti-infective',
		description: 'Antifungal for candidiasis and other fungal infections.'
	},
	{
		name: 'Vibramycin',
		composition: 'Doxycycline 100 mg',
		dosageForm: 'Capsule',
		packaging: 'Box of 20 capsules',
		category: 'Antibiotics',
		description: 'Tetracycline antibiotic used in respiratory and skin infections.'
	},
	{
		name: 'Prednisone',
		composition: 'Prednisone 20 mg',
		dosageForm: 'Tablet',
		packaging: 'Box of 30 tablets',
		category: 'Immunology',
		description: 'Systemic corticosteroid for inflammatory and autoimmune conditions.'
	},
	{
		name: 'Hydrocortisone Cream',
		composition: 'Hydrocortisone 1% w/w',
		dosageForm: 'Cream',
		packaging: 'Tube 30 g',
		category: 'Dermatology',
		description: 'Topical corticosteroid for inflammatory skin conditions.'
	},
	{
		name: 'Tamiflu',
		composition: 'Oseltamivir 75 mg',
		dosageForm: 'Capsule',
		packaging: 'Box of 10 capsules',
		category: 'Antiviral',
		description: 'Neuraminidase inhibitor for treatment and prevention of influenza.'
	}
];

const importData = async () => {
	try {
		await Product.deleteMany();
		await Product.insertMany(products);
		console.log('✅ Products imported successfully');
		process.exit();
	} catch (error) {
		console.error('❌ Import failed:', error.message);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Product.deleteMany();
		console.log('🗑️  All products removed');
		process.exit();
	} catch (error) {
		console.error('❌ Destroy failed:', error.message);
		process.exit(1);
	}
};

connectDB().then(() => {
	if (process.argv[2] === '-d') {
		destroyData();
	} else {
		importData();
	}
});

