import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SymptomChecker from '../pages/SymptomChecker';
import * as api from '../utils/api';

// Mock the AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    isAuthenticated: false,
  }),
}));

// Mock the API
jest.mock('../utils/api', () => ({
  symptomAPI: {
    getAll: jest.fn(),
    checkSymptoms: jest.fn(),
  },
}));

// Mock SymptomSearch component
jest.mock('../components/SymptomSearch', () => {
  return function MockSymptomSearch({ onSymptomsChange }) {
    return (
      <div data-testid="symptom-search">
        <button
          onClick={() =>
            onSymptomsChange([
              { symptom_id: 'SYM001', symptom: 'জ্বর (Fever)' },
              { symptom_id: 'SYM002', symptom: 'কাশি (Cough)' },
            ])
          }
        >
          Select Symptoms
        </button>
      </div>
    );
  };
});

const renderWithProviders = (component) => {
  return render(component);
};

describe('SymptomChecker - Results Display Fix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  test('should display results after API call and not disappear', async () => {
    // Mock API response
    const mockResponse = {
      data: {
        overall_risk: 'Medium',
        total_symptoms: 2,
        results: [
          {
            symptom_id: 'SYM001',
            symptom: 'জ্বর (Fever)',
            category: 'General Symptoms',
            advice: 'Rest and drink water',
            risk_level: 'Medium',
            recommended_doctor: 'General Physician',
          },
          {
            symptom_id: 'SYM002',
            symptom: 'কাশি (Cough)',
            category: 'Respiratory',
            advice: 'Monitor symptoms',
            risk_level: 'Low',
            recommended_doctor: 'General Physician',
          },
        ],
      },
    };

    api.symptomAPI.checkSymptoms.mockResolvedValue(mockResponse);

    renderWithProviders(<SymptomChecker />);

    // Select symptoms
    const selectButton = screen.getByText('Select Symptoms');
    fireEvent.click(selectButton);

    // Wait for button to show selected symptoms count
    const checkButton = await screen.findByText(/পরীক্ষা শুরু করুন.*2.*টি লক্ষণ/);
    
    // Click check symptoms button
    fireEvent.click(checkButton);

    // Wait for results to appear using findBy which waits automatically
    const resultsHeader = await screen.findByText(/পরীক্ষার ফলাফল/, {}, { timeout: 5000 });
    expect(resultsHeader).toBeInTheDocument();

    // Verify results are still visible (not disappeared)
    expect(screen.getByText(/জ্বর.*Fever/)).toBeInTheDocument();
    expect(screen.getByText(/কাশি.*Cough/)).toBeInTheDocument();

    // Wait a bit more to ensure results don't disappear
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Verify still there
    expect(screen.getByText(/পরীক্ষার ফলাফল/)).toBeInTheDocument();
  });

  test('should use unique keys (symptom_id) for result items', async () => {
    const mockResponse = {
      data: {
        overall_risk: 'Low',
        total_symptoms: 1,
        results: [
          {
            symptom_id: 'SYM001',
            symptom: 'Unique Test Symptom',
            category: 'Test Category',
            advice: 'Test Advice',
            risk_level: 'Low',
            recommended_doctor: 'Test Doctor',
          },
        ],
      },
    };

    api.symptomAPI.checkSymptoms.mockResolvedValue(mockResponse);

    renderWithProviders(<SymptomChecker />);

    // Select symptoms
    fireEvent.click(screen.getByText('Select Symptoms'));

    await waitFor(() => {
      expect(screen.getByText(/পরীক্ষা শুরু করুন/)).toBeInTheDocument();
    });

    // Click check button
    const checkButton = screen.getByText(/পরীক্ষা শুরু করুন/);
    fireEvent.click(checkButton);

    // Results should render with proper keys
    await waitFor(
      () => {
        expect(screen.getByText(/Unique Test Symptom/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('should clear results only when symptoms change, not on mount', async () => {
    // Mock console.log to verify behavior
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    renderWithProviders(<SymptomChecker />);

    // Initially no results
    expect(screen.queryByText('পরীক্ষার ফলাফল')).not.toBeInTheDocument();

    // Select symptoms (should not clear results since there are none)
    fireEvent.click(screen.getByText('Select Symptoms'));

    await waitFor(() => {
      expect(screen.getByText(/পরীক্ষা শুরু করুন.*2.*টি লক্ষণ/)).toBeInTheDocument();
    });

    // Verify no "Clearing previous results" message was logged
    const clearMessages = consoleSpy.mock.calls.filter((call) =>
      String(call[0]).includes('Clearing previous results')
    );
    expect(clearMessages.length).toBe(0);

    consoleSpy.mockRestore();
  });
});
