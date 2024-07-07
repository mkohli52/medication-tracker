'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

const PatientContext = createContext(undefined);
export function PatientProvider({ children }) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/get-members');
            setPatients(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch patients');
            console.error('Error fetching patients:', err);
        } finally {
            setLoading(false);
        }
    };

    const addPatient = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('/add-member', data);
            setPatients(prevPatients => [...prevPatients, response.data]);
        } catch (err) {
            setError('Failed to add patient');
            console.error('Error adding patient:', err);
        }
        setLoading(false);
    };

    const addMedication = async (data) => {
        try {
            const response = await axios.post('/add-medication', data);
            fetchPatients();
        } catch (err) {
            setError('Failed to add patient');
            console.error('Error adding patient:', err);
        }
    };

    const editMedication = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('/edit-medication', data);
            fetchPatients();
        } catch (err) {
            setError('Failed to add patient');
            console.error('Error adding patient:', err);
        }
        setLoading(true);
    };

    const toggleMedicationLog = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('/toggle-medication-log', data);
            fetchPatients();
        } catch (err) {
            setError('Failed to add patient');
            console.error('Error adding patient:', err);
        }
        setLoading(true);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <PatientContext.Provider value={{ patients, loading, error, fetchPatients, addPatient, addMedication, editMedication, toggleMedicationLog }}>
            {children}
        </PatientContext.Provider>
    );
}

// Create a hook to use the patient context
export function usePatients() {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
}