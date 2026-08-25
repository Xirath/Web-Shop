"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton(){
    const {pending} = useFormStatus();
    return (
        <button
        type="submit" 
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        disabled={pending}
  
>
        {pending ? "Saving..." : "Save"}
</button>

    );
}