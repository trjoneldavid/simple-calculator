import {Button} from '@chakra-ui/react'

interface CalculatorButtonProps{
    OnClick: (value: string) => void
}

const calculatorButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '+',
    'C', '0', '.', '-',
    '^','='
]
function CalculatorButtons({OnClick}: CalculatorButtonProps){
    return <>
        {
            calculatorButtons.map(
                (btn) =>
                    <Button colorScheme='gray'
                            key={btn}
                            w='30%' h='10'
                            onClick={() => OnClick(btn)}>
                        {btn}
                    </Button>
            )
        }
    </>
}

export default CalculatorButtons