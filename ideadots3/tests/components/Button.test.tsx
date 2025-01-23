//import { test, expect, describe, it } from 'vitest'
import {render,screen} from '@testing-library/react'
import Button from '../../src/Component/Button'
import React from 'react'
import '@testing-library/jest-dom/vitest' // with jest change to jest
import { describe, expect, it } from 'vitest'

describe('Button', () => {
    it('should render the text being passed as a prop', () => {
        const textParam = "click here!";
        render(<Button onClick={()=>{console.log("clicked!")}}text={textParam}/>);
        const button= screen.getByRole('button',{name: textParam});
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(textParam);
    })
})
