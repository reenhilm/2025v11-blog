"use client";
import React from "react";

function onRetry() {
    window.location.reload();
}

export default function ErrorDialog({ message }: { message: string | null }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold text-gray-900">An Error Occurred</h2>

                <p className="text-gray-600 mt-2">
                    { message || "Something went wrong. Please try again."}
                </p>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={onRetry}
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    )
}