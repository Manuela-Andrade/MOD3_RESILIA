import React from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadioImage = styled.label`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 80px;

  input[type="radio"] {
    display: none;
  }

  .image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #74062e;
    border-radius: 80px;
  }

  &:hover {
    border-color: black;
  }

  &.selected {
    border-color: red;
  }
`;

const RadioButton = ({ options, name, checkedValue, onChange }) => {
    const handleRadioChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <>
            {options.map((option) => (
                <div key={option.id} className="d-flex">
                    <RadioWrapper className='flex-column' key={option.value}>
                        <RadioImage
                        
                            className={checkedValue === option.value ? 'selected' : ''}
                        >
                            <img className='image' src={option.imageUrl} alt={option.label} />
                            <input
                                type="radio"
                                id={option.value}
                                name={name}
                                value={option.value}
                                checked={checkedValue === option.value}
                                onChange={handleRadioChange}
                            />
                        </RadioImage>
                        <label htmlFor={option.value}>{option.label}</label>
                    </RadioWrapper>
                </div>
            ))}
        </>
    );
};

export default RadioButton;
