import React, { useEffect, useState } from "react";

export const getAllUsers = async () => {
    try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data.users; // The 'users' array from the response
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};