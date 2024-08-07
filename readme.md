A React utilities library.
```json
"react": ">=17.0.0 <19.0.0",
"react-dom": ">=17.0.0 <19.0.0"
```
## Installation

To install the package, run:

```bash
npm install @hyune/react
```



</br>
</br>






# Hooks


## `useDebounce`

```tsx
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);
  const debounce = useDebounce(input, 300);
  ```

## `useObserver`

```tsx
const handleAlert=()=>alert("Find Element");
const divEl =useObserver(handleAlert)

<div ref={divEl}/> 
```

## `useWindowSize`
```tsx
const {width,height} =useWindowSize()
```
## `useModal`
```tsx
import React from 'react'
import { useModal } from '@hyune/react/hooks'

const ExampleComponent = () => {
  const { openModal, closeModal, Modal } = useModal()

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        dismissOnOutsideClick={true}
        modalClassName="example-modal"
        overlay={true}
        overlayClassName="example-overlay"
      >
        <div>
          <h2>Modal Title</h2>
          <p>This is the content of the modal.</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </div>
  )
}

export default ExampleComponent
```

# Utils

## `fetcher`
```tsx
try {
  const data = await fetcher('/api/data')
  console.log('Data:', data)
} catch (error) {
  console.error('Error fetching data:', error)
}

```






