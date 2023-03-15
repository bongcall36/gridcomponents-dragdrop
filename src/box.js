import { memo } from 'react'
import { useDrag } from 'react-dnd'
export const Box = memo(function Box({ component, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(
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
    <div ref={drag} style={{border: '1px dashed gray', padding: '0.5rem 1rem', float:'left', opacity }} data-testid="box">
      {isDropped ? <s>{component.component}</s> : component.component}
    </div>
  )
})
