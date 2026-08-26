"use client"
import { deleteProductAction } from "../actions"

export function DeleteButton({id}:{id:number}){

    const handleDelete = async() => {}
    return(
        <form action={handleDelete}>
            <button type="submit">Delete</button>
            
        </form>
    )
}