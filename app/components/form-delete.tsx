import { deleteProductAction } from "../admin/actions";

export function DeleteButton({id}: {id:number}){
    return(
        <form action={deleteProductAction}>
            <input type="hidden" name="id" value={id}></input>
            <button type="submit"
            className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800"
            >Delete</button>

        </form>
    )
}