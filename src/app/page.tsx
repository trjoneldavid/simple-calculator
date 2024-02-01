"use client"
import {Card} from '@chakra-ui/react'
import {Grid} from '@chakra-ui/react'
import InputField from "@/components/InputField";
import CalculatorButtons from "@/components/CalculatorButtons";
import {useState} from "react";
import { Center} from '@chakra-ui/react'
export default function Home() {

    const [expression, setExpression] = useState("")

    const clickEvent = (value: string) => {
        if (value === '=') {
           setExpression(eval(expression.toString().replace('^', '**')))
        } else if (value === 'C') {
            setExpression('')
        }
        else if(value === 'DEL'){
            setExpression(expression.slice(0,-1))
        }
        else {
            setExpression((prev) => {
                const newExpression = prev + value;
                return newExpression.replace(/^0+(?=\d+(\.\d+)?$)/, '')
            });
        }
    }

    return (
        <Center w='auto' h='750'>
            <Card padding={4} margin='auto' width={300} height='auto'>
                <InputField value={expression} onChange={setExpression}></InputField>
                <Grid templateColumns='repeat(4, 1fr)' gap={3} margin={4}>
                    <CalculatorButtons OnClick={clickEvent}/>
                </Grid>
            </Card>
        </Center>
    );
}
