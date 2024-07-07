"use client"
import React from 'react'
import InfoCard from './InfoCard';
import axios from '@/lib/axios';
import { usePatients } from '@/contexts/PatientContext';

const MedicineInformation = () => {
    const { patients, loading, error } = usePatients();
    console.log(patients);

    return (
        <div className='flex justify-between flex-wrap lg:!flex-wrap'>
            {
                patients && patients.map(patient => (
                    <InfoCard patient={patient} />
                ))
            }
        </div>
    )
}

export default MedicineInformation