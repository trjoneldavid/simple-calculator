"use client"
import { Card, Grid, Center } from '@chakra-ui/react';
import InputField from "@/components/InputField";
import CalculatorButtons from "@/components/CalculatorButtons";
import { useEffect, useState, useCallback } from "react";
import { evaluate } from 'mathjs';

export default function Home() {
    const [expression, setExpression] = useState("");

    const clickEvent = useCallback((value: string) => {
        if (value === '=') {
            if (expression !== '') {
                setExpression(evaluate(expression).toString());
            }
        } else if (value === 'AC') {
            setExpression('');
        } else if (value === 'DEL') {
            setExpression(expression.toString().slice(0, -1));
        } else {
            setExpression((prev) => prev + value);
        }
    }, [expression]);
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                clickEvent('=');
            } else if (event.key === 'Backspace') {
                clickEvent('DEL');
            } else if (!isNaN(Number(event.key))|| ['+', '-','%','/','^'].includes(event.key)){
                clickEvent(event.key);
            }
        };

        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, [clickEvent, expression]);

    return (
        <Center w='auto' h='750' onKeyDown={(e)=>e.preventDefault()}>
            <Card padding={4} margin='auto' width={250} height='auto' >
                <InputField value={expression} onChange={setExpression}></InputField>
                <Grid templateColumns='repeat(4, 1fr)' gap={3} margin={4}>
                    <CalculatorButtons OnClick={clickEvent} />
                </Grid>
            </Card>
        </Center>
    );
}
