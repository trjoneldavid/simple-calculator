import {Input} from '@chakra-ui/react'
interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
}

function InputField({value, onChange}: InputFieldProps) {
    return <>
        <Input
            height='50'
            width='auto'
            variant="filled"
            readOnly={true}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </>
}

export default InputField;