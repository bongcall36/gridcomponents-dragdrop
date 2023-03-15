import { Col, Row, Space, Button, Radio, Card, Modal, Switch } from 'antd';
export const componentList = {
    rowCount:3,
    colCount: [3, 1, 3],
    colResize: true,
    rowStyle: {padding: '8px 8px 8px 8px'},
    componentStyle: {background: '#0092ff', padding: '8px 8px', height: '10em'},
    data:[
        {
            component: 'component1',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 1,
            column: 1,
            index: 0, 
            droptype: 'component',
            drop: false,              
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
            droptype: 'component',
            drop: false  
        },
        {
            component: 'component3',
            type: 'Card',
            code:                    
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>,
            show: false,
            row: 1,
            column: 3,
            index: 2, 
            droptype: 'component',
            drop: false  
        },
        {
            component: 'component4',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 2,
            column: 1,
            index: 3, 
            droptype: 'component',
            drop: false  

        },
        {
            component: 'component5',
            type: 'Button',
            code: <Button type="primary">Primary Button</Button>,
            show: true,
            row: 3,
            column: 1,
            index: 4, 
            droptype: 'component',
            drop: false  

        },
        {
            component: 'component6',
            type: 'Radio',
            code: <Radio>Radio</Radio>,
            show: true,
            row: 3,
            column: 2,
            index: 5, 
            droptype: 'component',
            drop: false  

        },
        {
            component: 'component7',
            type: 'Card',
            code:                    
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>,
            show: true,
            row: 3,
            column: 3,
            index: 6, 
            droptype: 'component',
            drop: false  

        }
]}