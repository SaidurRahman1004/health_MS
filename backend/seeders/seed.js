const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected for Seeding'))
    .catch(err => {
        console.log('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Load Models
const Category = require('../models/Category');
const Symptom = require('../models/Symptom');
const Doctor = require('../models/Doctor');
const Mapping = require('../models/Mapping');
const FirstAid = require('../models/FirstAid');
const Article = require('../models/Article');
const Hospital = require('../models/Hospital');

// Import Data
const importData = async () => {
    try {
        // Read JSON files
        const categories = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf-8')
        );
        const symptoms = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'symptoms.json'), 'utf-8')
        );
        const doctors = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'doctors.json'), 'utf-8')
        );
        const mappings = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'mappings.json'), 'utf-8')
        );
        const firstAid = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'first_aid.json'), 'utf-8')
        );
        const articles = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'articles.json'), 'utf-8')
        );
        const hospitals = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'hospitals.json'), 'utf-8')
        );

        console.log('📁 JSON files loaded successfully');

        // Delete existing data
        console.log('🗑️  Deleting old data...');
        await Category.deleteMany({});
        await Symptom.deleteMany({});
        await Doctor.deleteMany({});
        await Mapping.deleteMany({});
        await FirstAid.deleteMany({});
        await Article.deleteMany({});
        await Hospital.deleteMany({});

        console.log('✅ Old data deleted');

        // Insert new data
        console.log('📥 Inserting new data...');
        await Category.insertMany(categories);
        console.log('✅ Categories inserted');

        await Symptom.insertMany(symptoms);
        console.log('✅ Symptoms inserted');

        await Doctor.insertMany(doctors);
        console.log('✅ Doctors inserted');

        await Mapping.insertMany(mappings);
        console.log('✅ Mappings inserted');

        await FirstAid.insertMany(firstAid);
        console.log('✅ First Aid inserted');

        await Article.insertMany(articles);
        console.log('✅ Articles inserted');

        await Hospital.insertMany(hospitals);
        console.log('✅ Hospitals inserted');

        console.log('\n🎉 All Data Imported Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Category.deleteMany({});
        await Symptom.deleteMany({});
        await Doctor.deleteMany({});
        await Mapping.deleteMany({});
        await FirstAid.deleteMany({});
        await Article.deleteMany({});
        await Hospital.deleteMany({});

        console.log('✅ All Data Deleted Successfully! ');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error deleting data:', error);
        process.exit(1);
    }
};

// Run based on command
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please use -i to import or -d to delete data');
    process.exit(0);
}