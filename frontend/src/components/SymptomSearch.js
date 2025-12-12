import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { symptomAPI } from '../utils/api';
import './SymptomSearch.css';

const SymptomSearch = ({ onSymptomsChange }) => {
    const [allSymptoms, setAllSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSymptoms, setFilteredSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(true);

    const searchRef = useRef(null);

    // Load all symptoms on component mount
    useEffect(() => {
        fetchSymptoms();
    }, []);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Notify parent component when symptoms change
    useEffect(() => {
        if (onSymptomsChange) {
            onSymptomsChange(selectedSymptoms);
        }
    }, [selectedSymptoms, onSymptomsChange]);

    const fetchSymptoms = async () => {
        try {
            const response = await symptomAPI.getAll();
            setAllSymptoms(response.data);
            setLoading(false);
        } catch (error) {
            // Error fetching symptoms - silently fail and show empty list
            setLoading(false);
        }
    };

    // Filter symptoms based on search
    const handleSearch = (value) => {
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredSymptoms([]);
            setShowSuggestions(false);
            return;
        }

        // Search in both Bangla and English
        const filtered = allSymptoms.filter(symptom => {
            const alreadySelected = selectedSymptoms.some(
                s => s.symptom_id === symptom.symptom_id
            );

            if (alreadySelected) return false;

            const searchLower = value.toLowerCase();
            const symptomLower = symptom.symptom.toLowerCase();

            return symptomLower.includes(searchLower);
        });

        setFilteredSymptoms(filtered);
        setShowSuggestions(filtered.length > 0);
    };

    // Add symptom to selected list
    const handleSelectSymptom = (symptom) => {
        if (selectedSymptoms.length >= 5) {
            alert('সর্বোচ্চ ৫টি লক্ষণ নির্বাচন করতে পারবেন');
            return;
        }

        setSelectedSymptoms([...selectedSymptoms, symptom]);
        setSearchTerm('');
        setFilteredSymptoms([]);
        setShowSuggestions(false);
    };

    // Remove symptom from selected list
    const handleRemoveSymptom = (symptomId) => {
        setSelectedSymptoms(selectedSymptoms.filter(s => s.symptom_id !== symptomId));
    };

    // Clear all selections
    const handleClearAll = () => {
        setSelectedSymptoms([]);
        setSearchTerm('');
        setFilteredSymptoms([]);
    };

    return (
        <div className="symptom-search-container">
            <div className="search-box" ref={searchRef}>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                        <FaSearch className="me-2" />
                        আপনার লক্ষণগুলো খুঁজুন (সর্বোচ্চ ৫টি)
                    </Form.Label>

                    <div className="position-relative">
                        <Form.Control
                            type="text"
                            placeholder="যেমন: জ্বর, মাথা ব্যথা, কাশি..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => searchTerm && setShowSuggestions(true)}
                            disabled={loading}
                            className="search-input"
                        />

                        {/* Auto-suggestion dropdown */}
                        {showSuggestions && filteredSymptoms.length > 0 && (
                            <ListGroup className="suggestions-dropdown">
                                {filteredSymptoms.slice(0, 10).map((symptom) => (
                                    <ListGroup.Item
                                        key={symptom.symptom_id}
                                        action
                                        onClick={() => handleSelectSymptom(symptom)}
                                        className="suggestion-item"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{symptom.symptom}</span>
                                            <Badge bg="secondary" pill>
                                                {symptom.category_id}
                                            </Badge>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                </Form.Group>
            </div>

            {/* Selected symptoms */}
            {selectedSymptoms.length > 0 && (
                <div className="selected-symptoms">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">
                            নির্বাচিত লক্ষণ ({selectedSymptoms.length}/5)
                        </h6>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleClearAll}
                        >
                            সব মুছে ফেলুন
                        </Button>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptom) => (
                            <Badge
                                key={symptom.symptom_id}
                                bg="primary"
                                className="selected-symptom-badge"
                            >
                                {symptom.symptom}
                                <FaTimes
                                    className="ms-2 remove-icon"
                                    onClick={() => handleRemoveSymptom(symptom.symptom_id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Helper text */}
            <Form.Text className="text-muted">
                💡 টিপস: আপনি যে সমস্যাগুলো অনুভব করছেন তা টাইপ করুন এবং সাজেশন থেকে সিলেক্ট করুন
            </Form.Text>
        </div>
    );
};

export default SymptomSearch;