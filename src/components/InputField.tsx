import {Input} from '@chakra-ui/react'

interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
}



function InputField({value, onChange}: InputFieldProps) {
    return <div>
        <Input
            height='50'
            width='100%'
            padding='5%'
            variant='filled'
            readOnly={true}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

export default InputField;