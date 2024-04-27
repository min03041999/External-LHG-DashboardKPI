import React from 'react';
import { Box, Typography } from '@mui/material';

const PDFViewer = (props) => {
    const { customStyle, pdfUrl } = props;

    return (
        <Box component={"div"} height={customStyle}>
            <iframe
                src={`${pdfUrl}#toolbar=0`}
                title="PDF Viewer"
                width="100%"
                height="100%"
                style={{ border: "none" }}
            ></iframe>
        </Box>
    )
}

export default PDFViewer;