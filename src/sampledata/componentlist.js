import { Col, Row, Space, Button, Radio, Card, Modal, Switch } from 'antd';
import { UiPdfButton } from '../pdfbutton';

export const componentList = {
    option:1,
    rowCount:3,
    colCount: [3, 1, 3],
    colResize: true,
    rowStyle: {padding: '8px 8px 8px 8px', margin: '0 0 0 0'},
    colStyle: {borderStyle: 'dotted', borderWidth: '1px', borderColor: '#000000'},
    componentStyle: {padding: '8px 8px', height: 'calc(100% - 16px)'},
    data:[
        {
            component: 'component1',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 1,
            column: 1,
            index: 0, 
            droptype: 'component'
        },
        {
            component: 'component2',
            type: 'Radio',
            code: <Radio>Radio</Radio>,
            codeS: `<Radio>Radio</Radio>`,            
            show: true,
            row: 1,
            column: 2,
            index: 1, 
            droptype: 'component'
        },
        {
            component: 'component3',
            type: 'Card',
            code:                    
            <Card title="Default size card" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>,
            show: false,
            row: 1,
            column: 3,
            index: 2, 
            droptype: 'component'
        },
        {
            component: 'component4',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 2,
            column: 1,
            index: 3, 
            droptype: 'component'
        },
        {
            component: 'component5',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 3,
            column: 1,
            index: 4, 
            droptype: 'component'
        },
        {
            component: 'component6',
            type: 'Radio',
            code: <Radio>Radio</Radio>,
            show: true,
            row: 3,
            column: 2,
            index: 5, 
            droptype: 'component' 
        },
        {
            component: 'component7',
            type: 'Card',
            code:                    
            <Card title="Default size card" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>,
            show: true,
            row: 3,
            column: 3,
            index: 6, 
            droptype: 'component'
        },
        {
            component: 'component8',
            type: 'pdf',
            code: <UiPdfButton pdfRef={null} pdfSavefile={'test-pdf-example.pdf'}/>,
            codevparams: {pdfRef: 'ref'},
            show: true,
            row: 4,
            column: 1,
            index: 7, 
            droptype: 'component' 
        }      
]}