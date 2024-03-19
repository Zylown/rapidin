import React from "react";

export interface InputProps {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputSearch?: string;
}