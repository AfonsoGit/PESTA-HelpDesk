//Código para mostrar a caixa de opções relativamente ao motivo do pedido
import React from 'react';
import Select from 'react-select';

//Função de style(CSS) do menu
const colourStyles = {
    menu: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
    }),
    

    
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
    }
  }

//Função main da página
const CustomSelect = ({onChange, options, value}) => {

    const defaultValue = (options,value) => {
        return options ? options.find(option=>option.value ===value):""
    }
    return(
        <div >
            <Select
                value={defaultValue(options,value)} 
                onChange={value=>onChange(value)} 
                options={options} 
                styles={colourStyles}
            />
        </div>
    )
}

export default CustomSelect;