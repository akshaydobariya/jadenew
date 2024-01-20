import { Pagination } from "@mui/material";

export default function PaginationControlled({ setPage, page, last_page }) {
    const handlePaginationChange = (event, value) => {
        setPage(value)
    }

    return (
        <div className="my-3 mb-5">
            <Pagination count={last_page} page={page} onChange={handlePaginationChange} />
        </div>
    )
}