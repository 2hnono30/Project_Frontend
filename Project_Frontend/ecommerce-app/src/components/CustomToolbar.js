import { memo } from "react";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, } from "@mui/x-data-grid";

function CustomToolbar() {
    return (
        <GridToolbarContainer className="d-flex justify-content-between my-1">
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
            </div>


        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
