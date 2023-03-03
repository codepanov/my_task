import React from "react";

import { data } from '../data/data';

import axios from 'axios';

interface Props {
  onSubmit: (value: string) => void;
}

const Autocomplete: React.FC<Props> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<string[]>([...data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  //Comment out this section to simulate a REST call, and uncomment the below section
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim();
    setInputValue(value);

    // simulate a REST call to filter the data
    const filtered = await filterData(value);
    setFilteredData(filtered);
  };

  const filterData = async (value: string) => {

    // simulate a REST call by waiting for a short delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return data.filter((item: string) => item.toLowerCase().includes(value));
  };

  //Uncomment this section to use the REST API, and comment out the above section
  /*
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim();
    setInputValue(value);

    const filtered = await filterData(value);
    setFilteredData(filtered);
  };

  const filterData = async (value: string) => {
    try {
      const result = await axios.get('http://localhost:8000/fruit');
      return result.data.filter((item: string) => item.toLowerCase().includes(value));
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  */

  type Params = {
    text: string;
    inputValue: string;
  }

  const highlightMatchingText = ({ text, inputValue }: Params) => {
    const regex = new RegExp(`(${inputValue})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.match(regex)) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const handleOptionClick = (value: string) => {
    setInputValue(value);
    setFilteredData(data);
  };

  return (
    <>
      <form className="dt-input-container" onSubmit={handleSubmit}>
        <label>
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button className="dt-input-button" type="submit">
          Submit
        </button>
      </form>
      <div className="dt-items-found">
        {
          filteredData.map((item: string, index: number) => (
            <p 
              key={index}
              onClick={
                () => handleOptionClick(item)
              }
            >
              {
                inputValue ? 
                  highlightMatchingText(
                    { text: item, inputValue }
                  ) : 
                item
              }
            </p>
          ))
        }
      </div>
    </>
  );
};

export default Autocomplete;
