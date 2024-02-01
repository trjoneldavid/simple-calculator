"use client"
import {Card} from '@chakra-ui/react'
import {Grid} from '@chakra-ui/react'
import InputField from "@/components/InputField";
import CalculatorButtons from "@/components/CalculatorButtons";
import {useState} from "react";
import { Center} from '@chakra-ui/react'
import {evaluate} from 'mathjs'
export default function Home() {
    const [expression, setExpression] = useState("")

    const clickEvent = (value: string) => {
        if (value === '=') {
            if (expression !== '') {
                setExpression(evaluate(expression).toString());
            }
        } else if (value === 'AC') {
            setExpression('')
        }
        else if(value === 'DEL'){
            setExpression(expression.toString().slice(0,-1))
        }
        else {
            setExpression((prev) => prev + value);
        }
    }

    return (
        <Center w='auto' h='750'>
            <Card padding={4} margin='auto' width={250} height='auto'>
                <InputField value={expression} onChange={setExpression}></InputField>
                <Grid templateColumns='repeat(4, 1fr)' gap={3} margin={4}>
                    <CalculatorButtons OnClick={clickEvent}/>
                </Grid>
            </Card>
        </Center>
    );
}
