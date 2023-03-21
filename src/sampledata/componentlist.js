import { Col, Row, Space, Button, Radio, Card, Modal, Switch } from 'antd';
import { UiPdfButton } from '../pdfbutton';

export const componentList = {
    option: 0, //0: 좌측 Drag Box, 1: 화면 상단 Drag Box
    fButton: [true, true, true, true, true], // Drag Box, component show/hide popup, 저장, 취소, 초기화
    rowCount: 3, // 화면 그리드 row 갯수
    colCount: [3, 1, 3], // 화면 그리드 row별 col 갯수
    colResize: true, // 그리드내 component show false일때 다른 col 확장 여부
    rowStyle: {padding: '8px 8px 8px 8px', margin: '0 0 0 0'}, // row style
    colStyle: {borderStyle: 'dotted', borderWidth: '1px', borderColor: '#000000'}, // col style
    componentStyle0: {padding: '8px 8px 8px 8px', height: 'calc(100% - 16px)'}, // option 0일때 component 공통 style
    componentStyle1: {padding: '8px 8px 8px 8px', height: '100%'}, // option 1일때 component 공통 style
    data:[
        {
            component: 'component1', //component 명
            type: 'Button', //component 타입
            code: <Button type="primary">Primary Button</Button>, // component React Code
            show: true, // show 여부
            row: 1, // row 위치(1부터 시작)
            column: 1, // column 위치(1부터 시작)
            index: 0, // component index(0부터 시작)
            droptype: 'component' // Drag&drop에서 받아들일 type
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
            codevparams: {pdfRef: 'ref'}, //key=code의 elem, value=code의 elec의 값
            show: true,
            row: 4,
            column: 1,
            index: 7, 
            droptype: 'component' 
        }      
]}