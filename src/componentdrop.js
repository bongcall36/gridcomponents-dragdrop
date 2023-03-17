import { memo } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

export const ComponentDrop = memo(function ComponentDrop({component, compstyle, accept, lastDroppedItem, onDrop}){
  //if(component.show === false) return
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver
  
  const selectBackgroundColor = (isActive, canDrop) => {
    if (isActive) {
      return '#f0f8ff'
    } else if (canDrop) {
      return '#faebd7'
    } else {
      return '#ffffff'
    }
  }
  const backgroundcolor = selectBackgroundColor(isActive, canDrop) 
  
  return (
    <div ref={drop} style={{...compstyle, backgroundColor: backgroundcolor}} data-testid="col">
      {lastDroppedItem ? lastDroppedItem.component.code : component.code}              
    </div>
  )
})
