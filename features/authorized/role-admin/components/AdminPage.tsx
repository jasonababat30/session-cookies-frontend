"use client";

import { useContext } from 'react';
import { AuthorizedContext } from '@/features/authorized/components/AuthorizedLayout';

const AdminPageComponent = () => {
    const {
        first_name,
        last_name,
        age
    } = useContext(AuthorizedContext) ?? {};

    return (
        <div
            className="w-full h-screen bg-purple-100 text-black"
        >
            <h1>ADMIN PAGE</h1>
            <p>Name: {`${first_name} ${last_name}`}</p>
            <p>Age: {age}</p>
        </div>
    );
}

export default AdminPageComponent;
