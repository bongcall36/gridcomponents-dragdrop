import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import { Col, Row, Space, Button, Radio, Card, Modal, Switch, Layout } from 'antd';
import _ from 'lodash'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import { Box } from './box'
import { ComponentDrop } from './componentdrop'

const { Header, Footer, Sider, Content } = Layout;

export function GridComponents(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false)

    // new Function 에서 사용하기 위해서는 전역 변수로 정의 되어야 한다
    ref = useRef()

    const createComponentsProps = (component) => {        
        if(component.codevparams !== undefined){                 
            for (const [key, value] of Object.entries(component.codevparams)) {
                component.code.props[key] = newFunction(value)()
            }
        }
    }

    const copyComponentsProps = (target, source) => {        
        if(source.codevparams !== undefined){                 
            for (const [key, value] of Object.entries(source.codevparams)) {
                target.code.props[key] = newFunction(value)()
            }
        }
    }

    const deleteComponentsProps = (component) => {        
        if(component.codevparams !== undefined){                 
            for (const [key, value] of Object.entries(component.codevparams)) {
                component.code.props[key] = null
            }
        }
    }
    
    // local Storage에 저장
    const saveLocalStorage = (componentList) => {
        const tempComponentList = _.cloneDeep(componentList)
        tempComponentList.data.forEach((data)=>{
            deleteComponentsProps(data)
            data.code = null
        })       
        localStorage.setItem('ComponentList', JSON.stringify(tempComponentList))
    }
    // local Storage에서 읽어오기
    const readLocalStorage = () => {
        let componentList = _.cloneDeep(props.componentList)
        const localStorageComonentList = localStorage.getItem('ComponentList')
        if(localStorageComonentList === null){
            return componentList
        }
        else{
            const tempComponentList = JSON.parse(localStorageComonentList)
            tempComponentList.data.forEach((data)=>{
                const findComponent = componentList.data.find((component)=>component.component === data.component)
                data.code = findComponent.code
                copyComponentsProps(data, findComponent)
            })
            return tempComponentList
        }            
    }
    // local Storage에 삭제
    const removeLocalStorage = (componentList) => {
        localStorage.removeItem('ComponentList')
    }
    const [currentComponentList, setComponentList] = useState(readLocalStorage);
    const [originComponentList, setOriginComponentList] = useState();


    const initSetDragBox = () => {
        const initDrag = currentComponentList.data.map((data)=>{
            return {
            'component' : data.component, 
            'type' : data.droptype
        }})
        return initDrag
    }

    const initSetDropComponent = () => {
        const initDrop = currentComponentList.data.map((data)=>{
            return{
            'accepts': data.droptype,
            'lastDroppedItem' : null
        }})
        return initDrop
    }

    const [dragBox, setDragBox] = useState(initSetDragBox)
    const [droppedBoxNames, setDroppedBoxNames] = useState([])
    const [dropComponent, setDropComponent] = useState(initSetDropComponent)

    function newFunction(param){
        let newFfunc = new Function("return " + param)
        return newFfunc 
    }
    const option = currentComponentList.option    
    const stylRow = currentComponentList.rowStyle
    const styleCol = currentComponentList.colStyle
    const styleComp = (option === 0) ? currentComponentList.componentStyle0: currentComponentList.componentStyle1
    
    let rows = []
    let cols = []
    let components = []
    let componentsBox = []

    const createGrid = () => {
        for(let i = 0; i < currentComponentList.rowCount; i++){
            let colCounts = currentComponentList.colCount[i]
            if(currentComponentList.colResize === true){
                const colsResize = currentComponentList.data.filter((component) => component.row === i+1 && component.show === true)
                colCounts = colsResize.length
            }            
            cols = []
            rows.push(
                <Row gutter={[16,16]} style={stylRow}>
                    {createCol(i, currentComponentList.colCount[i], colCounts)}
                    {cols}
                </Row>
            )
        }
    }

    const createCol = (i, colCount, colCounts) => {
        for(let j = 0; j < colCount; j++){
            components = []
            const component = getComponent(i+1, j+1)
            if(component.show === false) return

            cols.push(
                <Col key={j.toString()} span={24 / colCounts} style={styleCol}>
                    {createComponent(component)}
                    {components}
                </Col>
            )
        }        
    }

    const getComponent = (row, column) => {
        return currentComponentList.data.find((data)=>data.row === row && data.column === column)
    }

    const createComponent = (component) => {
        components.push(
            <ComponentDrop 
                component={component} 
                compstyle={styleComp} 
                accept={dropComponent[component.index].accepts}
                lastDroppedItem={dropComponent[component.index].lastDroppedItem}
                onDrop={(item) => handleDrop(component.index, item)}
                key={component.index}
            />
        )               
    }

    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1
    }

    const createComponentsBox = () => {        
        currentComponentList.data.forEach((component) =>{              
            createComponentsProps(component)
            componentsBox.push(
                <Box component={component} type={component.droptype} isDropped={isDropped(component.component)} key={component.index}/>
            )
        })
    }

    const handleDrop = useCallback(
        (index, item) => {
          const { component } = item
          setDroppedBoxNames(
            update(droppedBoxNames, component.component ? { $push: [component.component] } : { $push: [] }),
          )
          setDropComponent(
            update(dropComponent, {
              [index]: {
                lastDroppedItem: {
                  $set: item,
                },
              },
            }),
          )
        },
        [droppedBoxNames, dropComponent],
    )

    const showModal = () => {
        setIsModalOpen(true);
        setOriginComponentList(_.cloneDeep(currentComponentList))
    }
    
      const handleOk = () => {
        setIsModalOpen(false);
    }
    
      const handleCancel = () => {
        setIsModalOpen(false);
        setComponentList(_.cloneDeep(originComponentList))
    }

    const onChange = (component) => checked => {
        setModalEdit(!modalEdit)
        const findComponent = currentComponentList.data.find((data)=> data.component === component.component)
        findComponent.show = checked
    }

    const onSave = () => {
        const dropItems = dropComponent.map((component) => {
            if(component.lastDroppedItem !== null)
                return component.lastDroppedItem.component
        })
        
        currentComponentList.data.forEach((data)=>{
            if(dropItems[data.index] !== undefined){
                data.component = dropItems[data.index].component
                data.type = dropItems[data.index].type
                data.code = dropItems[data.index].code
                data.droptype = dropItems[data.index].droptype
                if(dropItems[data.index].codevparams !== undefined){        
                    data.codevparams = (_.cloneDeep(dropItems[data.index].codevparams))
                    copyComponentsProps(data, dropItems[data.index])   
                }         
            }
        })
        saveLocalStorage(currentComponentList)
    }
    
    const onCancel = () => {
        setDroppedBoxNames(
            update(droppedBoxNames, {$set: []}),
          )
        setDropComponent(initSetDropComponent)
    }

    const onInit = () => {
        onCancel()
        removeLocalStorage()
        setComponentList(readLocalStorage)
    }

    createGrid()
    createComponentsBox()
    if(option === 0){
        return(
            <div style={{background: '#f5f5f5', height:'100vh'}}>
                <div style={{textAlign:'right', margin: '8px 8px 0 0', background: '#ffffff'}}>
                    <Space direction="horizontal" align="end" >
                        <Button type="primary" block onClick={showModal}>Setting</Button>
                        <Button type="primary" block onClick={onSave}>Save</Button>
                        <Button type="primary" block onClick={onCancel}>Cancel</Button>
                        <Button type="primary" block onClick={onInit}>Init</Button>               
                    </Space>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <div style={{...stylRow, overflow:'auto', background: '#ffffff'}}>
                        {componentsBox}      
                    </div>
                    <div ref={ref} style={{ overflow: 'hidden', clear: 'both' }}>
                        {rows}            
                    </div>
                </DndProvider>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{transform: 'translate(700px, -50px)'}}>
                    {currentComponentList.data !== undefined ? currentComponentList.data.map((component) => 
                        <p> {component.component} <Switch style={{float:'right'}} checked={component.show} onChange={onChange(component)} /></p>
                    ) : null}
                </Modal>
            </div>
        )
    }
    else{
        return(
            <Layout>
                <DndProvider backend={HTML5Backend}>
                <Sider  style={{...stylRow, overflow: 'auto', height:'100vh', background: '#ffffff'}}>
                    {componentsBox}      
                </Sider >  
                <Content>     
                    <div style={{textAlign:'right', margin: '8px 8px 0 0'}}>
                        <Space direction="horizontal" align="end" >
                            <Button type="primary" block onClick={showModal}>Setting</Button>
                            <Button type="primary" block onClick={onSave}>Save</Button>
                            <Button type="primary" block onClick={onCancel}>Cancel</Button>
                            <Button type="primary" block onClick={onInit}>Init</Button>               
                        </Space>
                    </div>
                    <div ref={ref} style={{ overflow: 'hidden', clear: 'both' }}>
                        {rows}            
                    </div>
                </Content>
                </DndProvider>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{transform: 'translate(700px, -50px)'}}>
                    {currentComponentList.data !== undefined ? currentComponentList.data.map((component) => 
                        <p> {component.component} <Switch style={{float:'right'}} checked={component.show} onChange={onChange(component)} /></p>
                    ) : null}
                </Modal>
            </Layout>
        )
    }      
}
export default GridComponents;
