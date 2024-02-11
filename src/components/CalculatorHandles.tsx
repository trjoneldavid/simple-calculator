import {Button} from '@chakra-ui/react'
import ButtonType from "@/enums/ButtonType";

interface CalculatorButtonProps{
    OnClick: (value: string) => void
    type: ButtonType,
    label: string;
    value: string;
}

function Handle({OnClick, type, label,value}: CalculatorButtonProps){
    return <>
        <Button
            colorScheme={
            type ===  ButtonType.Primary ? "blue" : "gray"
        }
            w='auto' _hover={{background: type === ButtonType.Primary ? "steelblue" : "lightgrey"}}
            onClick={()=>OnClick(value)}>
            {label}
        </Button>
    </>
}

export default Handle
