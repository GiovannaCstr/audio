import { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'

export function AllProducts() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
        <h1>All products</h1>
        <button onClick={() => setOpen(true)}>Help</button>
        <BottomSheet open={open}>My awesome content here</BottomSheet>
      </>
    )
}


