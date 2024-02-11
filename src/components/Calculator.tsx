"use client"
import { Card, Grid, Center, GridItem } from '@chakra-ui/react';
import InputField from "@/components/InputField";
import Handle from "@/components/CalculatorHandles";
import { useEffect, useState, useCallback } from "react";
import { evaluate } from 'mathjs';
import ButtonType from "@/enums/ButtonType";

export default function Calculator() {
    const [expression, setExpression] = useState("0");
    const clickEvent = useCallback((value: string) => {

        function isOperator(String: string) {
            return /[+\-*/^]/.test(String);
        }

        if (value === '=') {
            try {
                setExpression(evaluate(expression).toString())
            }catch (error){
                setExpression("Error")
            }

        } else if (value === 'AC') {
            setExpression('');
        } else if (value === 'DEL') {
            setExpression(expression.toString().slice(0, -1))
        }

        else if(value === '~'){
            setExpression((prev) => {
                if (prev.startsWith('-')) {
                    return prev.substring(1);
                } else {
                    return '-' + prev;
                }
            });
        }
        //checks if there's consecutive operators
        else if (isOperator(value)) {
            setExpression((prev) => {
                //checks if the last character is an operator
                const lastCharIsOperator = isOperator(prev.charAt(prev.length - 1));

                //Checks if both the last and latest value is an operator
                if (lastCharIsOperator && isOperator(value)) {
                    //if so replace the previous operator with the new one
                    return prev.slice(0, -1) + value;
                } else {
                    return prev + value;
                }
            });
        }

        else if (value === '.') {
            setExpression((prev) => {
                const hasDecimal = /\./.test(prev);
                const hasOperator = /[+\-*/^]/.test(prev);
                // Split the expression into operands based on the operators
                const operands = prev.split(/[+\-*/^]/);
                const lastOperand = operands[operands.length - 1];

                // If the last operand doesn't contain a decimal point and there is no operator, or it's after an operator
                if ((!hasDecimal && !hasOperator) || (hasOperator && !/\./.test(lastOperand))) {
                    // Append the new decimal point to the expression
                    return prev + value;
                } else {
                    return prev;
                }
            });
        }
        else if (!isNaN(Number(value)) || ['+', '-', '/', '^', '*','.'].includes(value)) {
            //prevent population of leading 0s
            if (expression === '0' && (!isNaN(Number(value)))){
                setExpression(value);
            } else {
                setExpression((prev) => prev + value);
            }
        }
    }, [expression]);

    useEffect(() => {
        if(expression === ''){
            setExpression('0')
        }
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                clickEvent('=');
            } else if (event.key === 'Backspace') {
                clickEvent('DEL');
            } else if (!isNaN(Number(event.key))|| ['+', '-','%','/','^','*'].includes(event.key)){
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
            <Card padding={4} margin='auto' width='15%' height='auto'>

                <Grid templateColumns='repeat(4, 1fr)' gap={3} margin={1}>
                    <GridItem colSpan={4}>
                        <InputField value={expression} onChange={setExpression}></InputField>
                    </GridItem>
                    <Handle type={ButtonType.Primary} value='AC' label='AC' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='~' label='+/-' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='^' label='^' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='/' label='/' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='9' label='9' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='8' label='8' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='7' label='7' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='*' label='*' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='6' label='6' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='5' label='5' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='4' label='4' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='-' label='-' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='3' label='3' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='2' label='2' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='1' label='1' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='+' label='+' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='0' label='0' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='.' label='.' OnClick={clickEvent} />
                    <Handle type={ButtonType.Secondary} value='DEL' label='DEL' OnClick={clickEvent} />
                    <Handle type={ButtonType.Primary} value='=' label='=' OnClick={clickEvent} />
                </Grid>
            </Card>
        </Center>
    );
}
