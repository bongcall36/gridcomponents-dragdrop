import { memo } from 'react'
import { useDrag } from 'react-dnd'
export const Box = memo(function Box({ component, type, isDropped }) {
  const [{ opacity }, drag, dragPreview] = useDrag(
    () => ({
      type,
      item: { component },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [component, type],
  )
  
  return (
    <>
    <div ref={drag} style={{borderStyle: 'dotted', borderWidth: '1px 1px 1px 1px', borderColor: 'gray', padding: '0.5rem 1rem', float:'left', width: '170px', height: '150px', opacity }} data-testid="box">
      {isDropped ? <s>{component.component}</s> : component.component}
      <div ref={dragPreview} style={{width: '160px', marginLeft: '-10em', transform: 'scale(0.5,0.5)', transformOrigin: '350px 70px', float: 'left'}}>
        {component.code}
      </div>
    </div>

    </>
  )
})
