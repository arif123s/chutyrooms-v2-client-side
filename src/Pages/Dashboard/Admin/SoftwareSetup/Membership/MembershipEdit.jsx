import React from 'react';

const MembershipEdit = () => {
    return (
        <div className='membership-add-division'>
           <form className='membership-add-form'>
           <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Membership Name
                </label>
                <input
                  className="input-box"
                  id="name"
                  name="name"
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Description
                </label>
                <input
                  className="input-box"
                  id="description"
                  name="description"
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Amount Type
                </label>
                <input
                  className="input-box"
                  id="amount_type"
                  name="amount_type"
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
                <label className="property-input-title" htmlFor="CountryName">
                  Amount
                </label>
                <input
                  className="input-box"
                  id="amount"
                  name="amount"
                //   onChange={e => changeCountryFieldHandler(e)} 
                  
                />

            {/* {validationErrors.name && <span className='validation-message'>{validationErrors.name}</span>} */}
            </div>

            <div>
            <label className="property-input-title" htmlFor="view_order">
                    View Order
                  </label>
                  <input
                    className="input-box"
                    id="view_order"
                    name="view_order"
                    onChange={e => changeCountryFieldHandler(e)} 
                  />

                  
            {/* {validationErrors.view_order && <span className='validation-message'>{validationErrors.view_order}</span>} */}
            </div>


            <div>
            <div className="flex items-center gap-2">
                <div>
                    <input type="radio" id="is_active" name="is_active" value="1" onChange={e => changeCountryFieldHandler(e)} ></input>
                    <label className="cursor-pointer text-gray-700 ml-2">Active</label>
                </div>
                    
                <div>
                  <input type="radio" id="is_active" name="is_active" value="0" onChange={e => changeCountryFieldHandler(e)} ></input>
                  <label  className="cursor-pointer text-gray-700 ml-2">Inactive</label>
                </div>
               
            </div>
            {/* {validationErrors.is_active && <span className='validation-message'>{validationErrors.is_active}</span>} */}
            </div>
            

            <button className='country-save-btn'>Save</button>

           
            
            </form> 
        </div>
    );
};

export default MembershipEdit;