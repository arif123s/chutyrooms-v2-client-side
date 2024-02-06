import React, { useEffect, useState } from 'react';

const CountryAdd = () => {


    return (
        <div className='country-add-division'>
      
            <form className='country-add-form'>

                <label className="property-input-title" htmlFor="CountryName">
                  Country Name
                </label>
                <input
                  className="input-box"
                  id="CountryName"
                  name="CountryName"
                  
                />

                  <label className="property-input-title" htmlFor="bin">
                    View Order
                  </label>
                  <input
                    className="input-box"
                    id="bin"
                    name="bin"

                  />
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="active" name="radioGroup" ></input>
                    <label htmlFor="active" className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="inactive" name="radioGroup" ></input>
                  <label htmlFor="inactive" className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
            </div>

            <button className='country-save-btn'>Save</button>


        


            </form>
        </div>
    );
};

export default CountryAdd;