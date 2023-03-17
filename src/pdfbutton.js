import React from 'react';
import { Button } from 'antd';
import { DownSquareOutlined } from '@ant-design/icons';
import JsPdf from 'jspdf';
import { toCanvas } from 'html-to-image';

export function UiPdfButton(props){

    const OnPdfButtonClick = (e) => {  
        toCanvas(props.pdfRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("")
            const imgWidth = 295; 
            const pageHeight = 210;  

            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            const doc = new JsPdf('l', 'mm');
            let position = 0;
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            doc.save(props.pdfSavefile);
       })             
    }

    return(
        <Button icon={<DownSquareOutlined />} size="large" onClick={OnPdfButtonClick}/>
    )
}
